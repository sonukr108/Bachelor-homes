import React, { useState } from "react";
import LogoImg from '../assets/lightLogo.svg'
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className=" grid md:grid-cols-2 grid-cols-1 px-[5%] py-5 lg:px-[15%] md:py-10">
                <div className="absolute inset-0 bg-center bg-no-repeat bg-cover md:bg-fixed bg-[url('/loginbg.svg')] -z-10"></div>
                {/* Left Side */}
                <div className="left flex flex-col items-center md:items-start">
                    <img src={LogoImg} alt="Logo" className="w-24 h-24 md:mb-4" />
                    <h1 className="text-3xl font-bold text-white mb-2 md:flex hidden">
                        Start Your Journey with Bachelor Homes
                    </h1>
                    <p className="text-lg text-gray-200 mb-6 md:flex hidden">
                        Create an account to discover comfortable stays, connect with communities, and enjoy hassle-free living designed for your lifestyle.
                    </p>
                </div>

                {/* Right Side */}
                <div className="right flex items-center justify-center">
                    <div className="bg-white p-8 md:p-10 w-full md:w-96 flex flex-col justify-center rounded-md">

                        {/* Title */}
                        <h2 className="text-xl font-semibold text-center mb-6">
                            <span className="text-[#520075] font-bold">Sign up</span> your account
                        </h2>

                        {/* Updated Form */}
                        <form className="flex flex-col space-y-4">
                            {/* Name */}
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />

                            {/* Email */}
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />

                            {/* Password */}
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Re enter your password"
                                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />

                            {/* Show Password */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    className="w-4 h-4"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                                <label htmlFor="showPassword" className="text-gray-700 text-sm">
                                    Show password
                                </label>
                            </div>

                            {/* Buttons */}
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="flex-1 bg-purple-100 text-[#520075] font-medium py-2 rounded-md hover:bg-purple-200 transition cursor-pointer"
                                >
                                    Sign in
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#520075] text-white font-medium py-2 rounded-md hover:bg-purple-900 transition cursor-pointer"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="px-3 text-gray-500 text-sm">OR</span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        {/* Google Sign Up */}
                        <button className="flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="h-5 w-5 mr-2"
                            />
                            <span>Sign up with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
