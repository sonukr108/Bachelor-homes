import React, { useState } from 'react';
import logo from '../assets/lightlogo.svg'
import { CgClose, CgFormatJustify } from "react-icons/cg";
import { Link, useLocation } from 'react-router-dom';
import { TbColorSwatch } from "react-icons/tb";
import { LuPhoneCall } from "react-icons/lu";
import { IoGridOutline, IoHomeOutline } from "react-icons/io5";


const Sidebar = () => {
    const [sideOpen, setSideOpen] = useState(false);

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const items = [
        { to: '/', icon: <IoGridOutline size={20} />, text: 'Dashboard' },
        { to: '/rooms', icon: <IoHomeOutline size={20} />, text: 'My rooms' },
        { to: '/booking', icon: <TbColorSwatch size={20} />, text: 'Booking' },
        { to: '/callrequest', icon: <LuPhoneCall size={20} />, text: 'Callback request' },
    ];


    return (
        <div className='bg-[#520075] text-white'>

            {/* Mobile View */}
            <div className='md:hidden'>
                <div className='p-3 flex items-center gap-5'>
                    <CgFormatJustify size={25} onClick={() => setSideOpen(true)} />
                    <Link to={'/dashboard'}><img className='h-12' src={logo} alt="logo" /></Link>
                </div>

                <div className={`fixed  shadow-xl/30 shadow-black top-0 left-0 h-full w-50 bg-[#520075] z-50 transform transition-transform ease-in-out duration-300 ${sideOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col gap-2 items-start p-3">
                        <button className="ml-auto text-white mb-4" onClick={() => setSideOpen(false)}>
                            <CgClose size={25} />
                        </button>
                        {items.map((item, index) => (
                            <Link
                                key={index}
                                to={item.to}
                                className={`py-2 px-2 flex gap-2 items-center w-full ${isActive(item.to) ? 'bg-white text-[#520075] rounded-md' : ''}`}
                                onClick={() => setSideOpen(false)}
                            >
                                <span className={`text-xl transition-all duration-200`}>
                                    {item.icon}
                                </span>
                                {item.text}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className='md:w-[25vw] lg:w-[20vw] xl:w-[15vw] hidden md:flex flex-col items-center gap-2 p-5 h-screen text-md'>
                <Link to={'/dashboard'}><img className='h-16 lg:h-18 mb-4' src={logo} alt="logo" /></Link>
                {items.map((item, index) => (
                    <Link
                        key={index}
                        to={item.to}
                        className={`py-2 px-2 flex gap-2 items-center w-full ${isActive(item.to) ? 'bg-white text-[#520075]' : ''} rounded-md hover:bg-gray-300 hover:text-[#520075] transition-all duration-200`}
                        onClick={() => setSideOpen(false)}
                    >
                        <span className={`text-xl transition-all duration-200`}>
                            {item.icon}
                        </span>
                        {item.text}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
