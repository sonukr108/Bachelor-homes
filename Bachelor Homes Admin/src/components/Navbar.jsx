import { useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { PiLineVerticalThin, PiBell, PiEnvelopeSimple } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";


const Navbar = () => {
    const location = useLocation();
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const items = [
        { to: '/', text: 'Dashboard' },
        { to: '/rooms', text: 'My rooms' },
        { to: '/booking', text: 'Booking' },
        { to: '/callrequest', text: 'Callback request' },
    ];
    const activeItem = items.find(item => item.to === location.pathname);


    return (
        <nav className='w-full md:w-[75vw] lg:w-[80vw] xl:w-[85vw] px-3 py-3 md:px-6 md:py-4 shadow-md bg-white flex items-center justify-between relative'>
            <p className='text-2xl font-bold'>
                {activeItem ? activeItem.text : 'Unknown Page'}
            </p>

            <div className='flex items-center gap-3'>
                <div className='hidden md:flex items-center gap-3'>
                    <PiBell size={20} className='cursor-pointer' />
                    <PiEnvelopeSimple size={20} className='cursor-pointer' />
                    <PiLineVerticalThin size={20} />
                </div>

                {/* Profile */}
                <div className='relative' ref={dropdownRef}>
                    <div
                        className='profile flex items-center gap-3 justify-center cursor-pointer'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className='hidden md:flex flex-col items-end leading-4'>
                            <p className='font-bold text-md'>
                                Owner Name
                            </p>
                            <p className='text-sm text-gray-400'>Bachelor Homes owner</p>
                        </div>
                        <IoPersonCircleOutline size={40} />
                        <IoIosArrowDown size={20} className='text-gray-400' />
                    </div>

                    {/* Dropdown Popup */}
                    {isOpen && (
                        <div className='absolute right-0 w-64 bg-white border rounded-lg shadow-lg z-50'>
                            <div className="px-4 py-2">
                                <h2 className="font-bold text-lg">
                                    Owner Name
                                </h2>
                                <p className="text-sm text-gray-600">Bachelor Homes owner</p>
                                <p className="text-sm text-gray-600">Phone number: 0123456789</p>
                            </div>
                            <div className='px-4 pb-2 md:hidden flex flex-col gap-2'>
                                <p className='flex gap-2'><PiBell size={20} /> Notifications</p>
                                <p className='flex gap-2'> <PiEnvelopeSimple size={20} /> Messages</p>
                            </div>
                            <div
                                className="border-t p-3 text-sm text-blue-600 hover:bg-gray-100  rounded-b-lg cursor-pointer"
                            >
                                Sign out
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )

};

export default Navbar;
