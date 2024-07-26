import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

const sponsors = [
  '/media/logos/Artic_Fox_Logo.png',
  '/media/logos/campusTimes_logo.jpeg',
  '/media/logos/Decathlon-Logo.png',
  '/media/logos/iMOCH_logo.png',
  '/media/logos/microsoft-logo.png',
];

const SponsorCarousel = () => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const targetText = 'Previous Partners';
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const containerRef = useRef(null);

  useEffect(() => {
    const getRandomString = () => {
      const segments = ['_______', '____'];
      return segments.map(segment => 
        Array.from({ length: segment.length }).map(() => 
          randomChars.charAt(Math.floor(Math.random() * randomChars.length))
        ).join('')
      ).join(' ');
    };

    if (isVisible) {
      const rapidChangeInterval = setInterval(() => {
        setDisplayText(getRandomString());
      }, 50);

      const transitionTimeout = setTimeout(() => {
        clearInterval(rapidChangeInterval);

        let index = 0;
        const transitionInterval = setInterval(() => {
          setDisplayText(prev => {
            const segmentLength = targetText.split(' ').map(segment => segment.length);
            let updatedText = '';
            let cursor = 0;

            for (const length of segmentLength) {
              updatedText += targetText.slice(cursor, cursor + length) + ' ';
              cursor += length;
            }

            return updatedText.split('').map((char, i) =>
              i < index ? char : '_'
            ).join('');
          });

          index += 1;
          if (index > targetText.length + 1) {
            clearInterval(transitionInterval);
            setDisplayText(targetText); // Ensure final text is correctly displayed
          }
        }, 100);

      }, 1000);

      return () => {
        clearInterval(rapidChangeInterval);
        clearTimeout(transitionTimeout);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="p-4 py-20 mx-14 md:mx-48" ref={containerRef}>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8">
        {displayText}
      </h1>
      <div className='p-6 px-10'>
        <Slider {...settings}>
          {sponsors.map((src, index) => (
            <div key={index} className="flex items-center justify-center px-12">
              <img src={src} alt={`Sponsor ${index + 1}`} className="h-48 w-72 object-contain" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SponsorCarousel;
