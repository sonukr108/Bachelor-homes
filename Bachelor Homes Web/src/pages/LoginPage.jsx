import React, { useState } from "react";
import LogoImg from '../assets/lightLogo.svg'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center bg-[url('/loginbg.svg')] grid md:grid-cols-2 grid-cols-1 px-[5%] py-5 lg:px-[15%] md:py-20">
        <div className="left flex flex-col items-center md:items-start">
          <img src={LogoImg} alt="Logo" className="w-24 h-24 md:mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2 md:flex hidden">Find Your Perfect Stay with Bachelor Homes</h1>
          <p className="text-lg text-gray-200 mb-6 md:flex hidden">Sign in with your email to explore exclusive accommodations tailored for students and working professionals.</p>
        </div>
        <div className="right flex items-center justify-center">
          <div className="bg-white p-8 md:p-10 w-full md:w-96 flex flex-col justify-center rounded-md">
            <h2 className="text-xl font-semibold text-center mb-6">
              <span className="text-[#520075] font-bold">Login</span> your account
            </h2>

            {/* Form */}
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
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

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="flex-1 bg-purple-100 text-[#520075] font-medium py-2 rounded-md hover:bg-purple-200 transition cursor-pointer"
                >
                  Sign up
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#520075] text-white font-medium py-2 rounded-md hover:bg-purple-900 transition cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </form>

            {/* Or Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Sign In */}
            <button className="flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
