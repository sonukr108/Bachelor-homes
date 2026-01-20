import { useState } from 'react';
const Logo = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import SearchModel from './SearchModel';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className='fixed top-0 left-0 w-full border-b-2 border-gray-300 px-[5%] py-2 z-50 bg-white/70 backdrop-blur-sm'>
        <nav className='flex justify-between items-center'>
          <Link to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img className='h-10 md:h-15' src={Logo} alt="bachelor-homes logo" />
          </Link>
          <div className='hidden md:flex items-center gap-8 font-semibold text-gray-600 relative'>
            <button className='flex items-center py-2 border-b-2 border-transparent hover:border-[#520075] hover:text-[#520075] transition-all duration-300 cursor-pointer' onClick={() => setIsSearchOpen(true)}>Explore Residences</button>

            <div className='relative' onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)} >
              <button className='flex items-center gap-1 py-2 border-b-2 border-transparent hover:border-[#520075] hover:text-[#520075] transition-all duration-300 cursor-pointer'>
                Know more <ChevronDown size={18} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full bg-white shadow-md border border-gray-400 rounded w-40 z-50 py-4">
                  <Link to="/about" className="block px-4 py-2 hover:bg-[#F4E2FC] hover:text-[#520075] transition-all duration-300">About Us</Link>
                  <Link to="/team" className="block px-4 py-2 hover:bg-[#F4E2FC] hover:text-[#520075] transition-all duration-300">Our Team</Link>
                  <Link to="/partner" className="block px-4 py-2 hover:bg-[#F4E2FC] hover:text-[#520075] transition-all duration-300">Partner With Us</Link>
                </div>
              )}
            </div>

            <Link to="/login" className='bg-[#520075] text-white px-4 py-2 hover:rounded-lg transition-all duration-300'>Sign in</Link>
          </div>

          <div
            className='md:hidden flex items-center justify-center cursor-pointer z-50'
            onClick={() => setIsOpen(true)}
          >
            <Menu size={30} />
          </div>
        </nav>
      </div>

      <div className={`fixed top-0 right-0 h-full w-60 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-3">
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4 font-medium">
          <Link to="/" onClick={() => {
            setIsOpen(false)
            setIsSearchOpen(true)
          }}>Explore Residences</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/team" onClick={() => setIsOpen(false)}>Our Team</Link>
          <Link to="/partner" onClick={() => setIsOpen(false)}>Partner With Us</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className='bg-[#520075] text-white px-4 py-2 rounded-sm w-fit'>Sign in</Link>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xs bg-black/10 z-40"
          onClick={() => {
            setIsOpen(false);
            setDropdownOpen(false);
          }}
        ></div>
      )}
      <SearchModel isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
    </>
  );
};

export default Navbar;
