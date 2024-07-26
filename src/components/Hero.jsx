import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const targetText = 'Startup Expo 2024';
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const getRandomString = () => {
    const segments = ['_______', '____', '____'];
    return segments.map(segment => 
      Array.from({ length: segment.length }).map(() => 
        randomChars.charAt(Math.floor(Math.random() * randomChars.length))
      ).join('')
    ).join(' ');
  };

  useEffect(() => {
    const rapidChangeInterval = setInterval(() => {
      setDisplayText(getRandomString());
    }, 50);

    const transitionTimeout = setTimeout(() => {
      clearInterval(rapidChangeInterval);

      let index = 0;
      const transitionInterval = setInterval(() => {
        setDisplayText(prev => {
          const currentText = prev.split('').map((char, i) =>
            i < index ? targetText[i] : char
          ).join('');
          index += 1;
          if (index > targetText.length) {
            clearInterval(transitionInterval);
          }
          return currentText;
        });
      }, 150);

    }, 3000);

    return () => {
      clearInterval(rapidChangeInterval);
      clearTimeout(transitionTimeout);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center pt-16 md:pt-16 lg:pt-20 xl:pt-20 h-screen px-4 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center relative z-10"
      >
        <div className="mb-4">
          <Image 
            src="/media/logos/ECELL-LOGO.png" 
            alt="Ecell logo" 
            width={200} 
            height={200} 
            className="mx-auto rounded-lg object-contain"
          />
        </div>
        <h1 className="text-3xl sm:text-xl md:text-2xl lg:text-3xl mb-4 relative z-10">
          Presents
        </h1>
        <div className="relative inline-block border-4 border-retroBorder p-8 bg-retroBackground overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent pointer-events-none hover-gradient"></div>
          <h1
            className="text-5xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 relative z-10"
            style={{
              background: 'linear-gradient(90deg, rgba(255,0,150,1) 0%, rgba(0,204,255,1) 50%, rgba(255,0,150,1) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            {displayText}
          </h1>
          <p className="text-lg sm:text-md md:text-lg lg:text-xl mb-4 relative z-10">
            August ?, 2024 - August ?, 2024
          </p>
        </div>
        <br />
        <button className="border-4 border-white bg-transparent text-white px-4 py-2 md:px-6 md:py-3 transition-colors duration-300 hover:bg-white hover:text-black mt-8 relative z-10">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            <Link href="/register">Register now!</Link>
          </h1>
        </button>
      </motion.div>
      {/* Computer image positioned at the top right */}

    </div>
  );
};

export default Hero;
