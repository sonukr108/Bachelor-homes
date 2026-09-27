import { useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import MyProperties from "./pages/MyProperties";
import Booking from "./pages/Booking";
import CallbackRequest from "./pages/CallbackRequest";
import AuthPage from "./pages/AuthPage";

import useOwnerAuthStore from "./store/ownerAuthStore";

const App = () => {
    const isAuthenticated = useOwnerAuthStore(
        (state) => state.isAuthenticated
    );

    const logout = useOwnerAuthStore(
        (state) => state.logout
    );

    // Check authentication when application loads
    useEffect(() => {
        const accessToken = Cookies.get("ownerAccessToken");
        const refreshToken = Cookies.get("ownerRefreshToken");

        if (!accessToken && !refreshToken) {
            logout();
        }
    }, [logout]);

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: "8px",
                        padding: "12px 16px",
                    },
                }}
            />
            <BrowserRouter>
                <Routes>

                    {/* Login */}
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/" replace />
                            ) : (
                                <AuthPage />
                            )
                        }
                    />

                    {/* Dashboard */}
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <Dashboard />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    {/* Rooms */}
                    <Route
                        path="/properties"
                        element={
                            isAuthenticated ? (
                                <MyProperties />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    {/* Booking */}
                    <Route
                        path="/booking"
                        element={
                            isAuthenticated ? (
                                <Booking />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    {/* Callback Request */}
                    <Route
                        path="/callrequest"
                        element={
                            isAuthenticated ? (
                                <CallbackRequest />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;