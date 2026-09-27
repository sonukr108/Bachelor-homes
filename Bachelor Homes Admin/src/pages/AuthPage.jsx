import { useState } from "react";
import toast from "react-hot-toast";
import LogoImg from "/logo.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import api from "../middleware/authIntercepter";
import useOwnerAuthStore from "../store/ownerAuthStore";

const AuthPage = () => {
    const navigate = useNavigate();

    const login = useOwnerAuthStore((state) => state.login);

    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    // =========================
    // INPUT CHANGE
    // =========================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================
    // PHONE CHANGE
    // =========================
    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 10) {
            setFormData((prev) => ({
                ...prev,
                phone: value,
            }));
        }
    };

    // =========================
    // LOGIN
    // =========================
    const handleLogin = async () => {
        if (formData.phone.length !== 10) {
            toast.error("Please enter a valid 10-digit phone number.");
            return;
        }

        try {
            const response = await api.post("/owners/signin", {
                phone: formData.phone,
                password: formData.password,
            });

            const data = response.data;

            if (!data.success) {
                toast.error(data.message || "Login failed.");
                return;
            }

            /*
             * Store tokens in cookies
             *
             * NOTE:
             * These are frontend-accessible cookies.
             */
            Cookies.set(
                "ownerAccessToken",
                data.tokens.accessToken,
                {
                    expires: 1 / 96, // 15 minutes
                    sameSite: "lax",
                }
            );

            Cookies.set(
                "ownerRefreshToken",
                data.tokens.refreshToken,
                {
                    expires: 7,
                    sameSite: "lax",
                }
            );

            // Store owner information in Zustand
            login(data.owner);

            // Go to dashboard
            navigate("/");
            toast.success("Login Successful")
        } catch (error) {
            console.error("Login error:", error);

            toast.error(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        }
    };

    // =========================
    // SIGNUP
    // =========================
    const handleSignup = async () => {
        if (!formData.name.trim()) {
            toast.error("Please enter your name.");
            return;
        }

        if (formData.phone.length !== 10) {
            toast.error("Please enter a valid 10-digit phone number.");
            return;
        }

        if (!formData.password) {
            toast.error("Please enter your password.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await api.post("/owners/signup", {
                name: formData.name,
                phone: formData.phone,
                password: formData.password,
            });

            const data = response.data;

            if (!data.success) {
                alert(data.message || "Signup failed.");
                return;
            }

            toast.success("Account created successfully!");

            // Switch to login
            setIsSignup(false);

            // Clear form
            setFormData({
                name: "",
                phone: "",
                password: "",
                confirmPassword: "",
            });

            setShowPassword(false);
        } catch (error) {
            console.error("Signup error:", error);

            toast.error(
                error.response?.data?.message ||
                "Signup failed. Please try again."
            );
        }
    };

    // =========================
    // FORM SUBMIT
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignup) {
            await handleSignup();
        } else {
            await handleLogin();
        }
    };

    // =========================
    // SWITCH TO SIGNUP
    // =========================
    const switchToSignup = () => {
        setIsSignup(true);
        setShowPassword(false);

        setFormData({
            name: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });
    };

    // =========================
    // SWITCH TO LOGIN
    // =========================
    const switchToLogin = () => {
        setIsSignup(false);
        setShowPassword(false);

        setFormData({
            name: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">

            {/* Background */}
            <div className="absolute inset-0 bg-center bg-no-repeat bg-cover md:bg-fixed bg-[url('/loginbg.svg')] -z-10"></div>

            <div className="grid md:grid-cols-2 grid-cols-1 px-[5%] py-5 lg:px-[15%] md:py-10">

                {/* ================= LEFT SIDE ================= */}
                <div className="left flex flex-col items-center md:items-start">

                    <img
                        src={LogoImg}
                        alt="Logo"
                        className="invert w-24 h-24 md:mb-4"
                    />

                    <h1 className="text-3xl font-bold text-white mb-2 md:flex hidden">
                        {isSignup
                            ? "Start Your Journey with Bachelor Homes"
                            : "Welcome Back to Bachelor Homes"}
                    </h1>

                    <p className="text-lg text-gray-200 mb-6 md:flex hidden">
                        {isSignup
                            ? "Create an account to discover comfortable stays, connect with communities, and enjoy hassle-free living designed for your lifestyle."
                            : "Login to discover comfortable stays, manage your bookings, and enjoy hassle-free living with Bachelor Homes."}
                    </p>

                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="right flex items-center justify-center">

                    <div className="bg-white p-8 md:p-10 w-full md:w-96 flex flex-col justify-center rounded-md">

                        {/* Title */}
                        <h2 className="text-xl font-semibold text-center mb-6">

                            <span className="text-[#520075] font-bold">
                                {isSignup ? "Sign up" : "Login"}
                            </span>

                            {" "}

                            {isSignup
                                ? "your account"
                                : "to your account"}

                        </h2>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-4"
                        >

                            {/* Name */}
                            {isSignup && (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            )}

                            {/* Phone */}
                            <div className="flex border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-purple-400">

                                <div className="flex items-center px-3 bg-gray-100 text-gray-700 border-r border-gray-300 select-none">
                                    +91
                                </div>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    placeholder="Enter your phone"
                                    maxLength={10}
                                    required
                                    className="flex-1 p-3 outline-none"
                                />

                            </div>

                            {/* Password */}
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />

                            {/* Confirm Password */}
                            {isSignup && (
                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Re-enter your password"
                                    required
                                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            )}

                            {/* Show Password */}
                            <div className="flex items-center space-x-2">

                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="w-4 h-4 accent-[#520075]"
                                />

                                <label
                                    htmlFor="showPassword"
                                    className="text-gray-700 text-sm cursor-pointer"
                                >
                                    Show password
                                </label>

                            </div>

                            {/* Login */}
                            {!isSignup && (
                                <>
                                    <button
                                        type="submit"
                                        className="w-full bg-[#520075] text-white font-medium py-2 rounded-md hover:bg-purple-900 transition cursor-pointer"
                                    >
                                        Login
                                    </button>

                                    <p className="text-center text-sm text-gray-600 pt-2">
                                        Don't have an account?{" "}

                                        <button
                                            type="button"
                                            onClick={switchToSignup}
                                            className="text-[#520075] font-semibold hover:underline cursor-pointer"
                                        >
                                            Create new account
                                        </button>
                                    </p>
                                </>
                            )}

                            {/* Signup */}
                            {isSignup && (
                                <>
                                    <button
                                        type="submit"
                                        className="w-full bg-[#520075] text-white font-medium py-2 rounded-md hover:bg-purple-900 transition cursor-pointer"
                                    >
                                        Sign up
                                    </button>

                                    <p className="text-center text-sm text-gray-600 pt-2">
                                        Already have an account?{" "}

                                        <button
                                            type="button"
                                            onClick={switchToLogin}
                                            className="text-[#520075] font-semibold hover:underline cursor-pointer"
                                        >
                                            Sign in
                                        </button>
                                    </p>
                                </>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;