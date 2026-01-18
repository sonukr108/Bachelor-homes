import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/lightLogo.svg';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#520075] text-white px-[5%] py-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Socials */}
        <div className="flex flex-col items-start gap-6">
          <Link to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={Logo} alt="Bachelor Homes logo" className="h-25" />
          </Link>
          <div className="flex gap-4">
            <Link to="#" className="bg-white text-[#520075] p-2 rounded"><FaFacebookF size={20} /></Link>
            <Link to="#" className="bg-white text-[#520075] p-2 rounded"><FaTwitter size={20} /></Link>
            <Link to="#" className="bg-white text-[#520075] p-2 rounded"><FaLinkedinIn size={20} /></Link>
            <Link to="#" className="bg-white text-[#520075] p-2 rounded"><FaInstagram size={20} /></Link>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-bold mb-3">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/team" className="hover:underline">Team</Link></li>
            <li><Link to="/partner" className="hover:underline">Partner with us</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="font-bold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/faqs" className="hover:underline">FAQs</Link></li>
            <li><Link to="/tandc" className="hover:underline">T&C</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-sm text-white border-t border-white/30 pt-4">
        <p>
          Copyright © 2025 | All Rights Reserved by coding w0rld Pvt Ltd. | ♡ Sonu Kumar Verma ♡
        </p>
      </div>
    </footer>
  );
};

export default Footer;
