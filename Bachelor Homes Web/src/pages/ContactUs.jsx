import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BuildingImg from '../assets/building.svg';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-200px)] px-[5%] py-10 xl:px-[15%]">

                {/* Header */}
                <div className="text-center mt-20 mb-10">
                    <h2 className="text-2xl md:text-4xl font-extrabold">
                        Contact <span className="text-[#520075]">Us</span>
                    </h2>
                </div>

                {/* Office Address Box - Clean Look */}
                <div className="max-w-md mx-auto text-center mb-10 border-1 border-gray-500 rounded-xl p-6">
                    <h3 className="text-lg md:text-xl font-extrabold text-[#520075]">
                        BACHELOR HOMES CORPORATE OFFICE
                    </h3>
                    <p className="mt-2 text-gray-700 text-sm md:text-base leading-relaxed">
                        Nutan Nagar, Near Shiv Mandir Road, Hazaribag,<br />
                        Jharkhand, India, 825301
                    </p>
                </div>

                {/* Contact Form Section */}
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-[#F4E2FC] rounded-2xl p-6 md:p-10 ">

                    {/* Left Image */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={BuildingImg}
                            alt="Office Building"
                            className="rounded-xl w-full object-cover h-100 shadow-md"
                        />
                    </div>

                    {/* Right Form */}
                    <form className="w-full md:w-1/2 rounded-xl p-6 flex flex-col gap-4">

                        {/* Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input type="text" placeholder="First Name" className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#520075]" />
                            <input type="text" placeholder="Last Name" className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#520075]" />
                        </div>

                        {/* Mobile Number */}
                        <input type="text" placeholder="+91  Mobile Number" className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#520075]" />

                        {/* State & Locality */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input type="text" placeholder="Select State" className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#520075]" />
                            <input type="text" placeholder="Select Locality" className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#520075]" />
                        </div>

                        {/* Message */}
                        <textarea placeholder="Message" rows="4" className="p-2 h-24 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#520075] resize-none"></textarea>
                        {/* Checkbox */}
                        <label className="flex items-start gap-2 text-sm">
                            <input type="checkbox" className="mt-1" />
                            <span>
                                By clicking on the button I agree to the <span className="text-[#520075] hover:underline cursor-pointer"><Link to={'/tandc'}>Terms and Conditions</Link></span>.
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button className="bg-[#520075] text-white py-2 rounded-lg hover:bg-[#3b005c] transition font-semibold">
                            Connect
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;
