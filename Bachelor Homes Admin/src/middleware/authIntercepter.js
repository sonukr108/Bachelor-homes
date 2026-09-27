import axios from "axios";
import Cookies from "js-cookie";
import useOwnerAuthStore from "../store/ownerAuthStore";
import usePropertyStore from "../store/propertyStore";

const baseURL = import.meta.env.VITE_API_BASE_URL;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });

    failedQueue = [];
};

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

const logoutUser = () => {
    Cookies.remove("ownerAccessToken", {
        path: "/",
    });

    Cookies.remove("ownerRefreshToken", {
        path: "/",
    });

    useOwnerAuthStore.getState().logout();
    usePropertyStore.getState().clearProperties();
};

api.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get("ownerAccessToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            originalRequest?._retry
        ) {
            return Promise.reject(error);
        }

        if (
            originalRequest?.url === "/owners/refresh-token"
        ) {
            logoutUser();
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve,
                    reject,
                });
            }).then((newAccessToken) => {
                if (newAccessToken) {
                    originalRequest.headers.Authorization =
                        `Bearer ${newAccessToken}`;
                }

                return api(originalRequest);
            });
        }

        isRefreshing = true;

        try {
            const refreshToken =
                Cookies.get("ownerRefreshToken");

            if (!refreshToken) {
                throw new Error("Refresh token not found");
            }

            const response = await axios.post(
                `${baseURL}/owners/refresh-token`,
                {
                    refreshToken,
                }
            );

            const newAccessToken =
                response.data.accessToken;

            if (!newAccessToken) {
                throw new Error(
                    "New access token not received"
                );
            }

            Cookies.set(
                "ownerAccessToken",
                newAccessToken,
                {
                    expires: 1 / 96,
                    sameSite: "lax",
                    path: "/",
                }
            );

            processQueue(null, newAccessToken);

            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);

            logoutUser();

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export { logoutUser };

export default api;