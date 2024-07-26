import React from 'react';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-6 m-2">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-4">
          <Image 
            src="/media/logos/ECELL-LOGO.png" 
            alt="Ecell logo" 
            width={150} 
            height={150} 
            className="object-contain"
          />
        </div>
        <div className="flex space-x-4 mb-4 border-2 p-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-3xl hover:text-blue-500 transition-colors duration-300" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-3xl hover:text-blue-400 transition-colors duration-300" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-3xl hover:text-pink-500 transition-colors duration-300" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-3xl hover:text-blue-700 transition-colors duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
