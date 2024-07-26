import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

const carouselItems = [
  {
    id: 1,
    heading: 'Startup Showcases',
    subheading: 'Daily exhibitions featuring cutting-edge products and solutions from participating startups',
  },
  {
    id: 2,
    heading: 'Roam Around Interviews',
    subheading: 'Experience entrepreneurs personally presenting their startups and stories, broadcast live.',
  },
  {
    id: 3,
    heading: 'One Minute Pitch Decks',
    subheading: 'Witness startups deliver concise and impactful presentations to investors and the audience, showcasing their unique value propositions',
  },
  // Add more items as needed
];

const Carousel = () => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const targetText = 'Overview';
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const containerRef = useRef(null);

  useEffect(() => {
    const getRandomString = () => {
      const segments = ['________'];
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
            const currentText = prev.split('').map((char, i) =>
              i < index ? targetText[i] : char
            ).join('');
            index += 1;
            if (index > targetText.length) {
              clearInterval(transitionInterval);
            }
            return currentText;
          });
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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
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
    <div className="p-6 md:py-36" ref={containerRef}>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8">
        {displayText}
      </h1>
      <Slider {...settings}>
        {carouselItems.map(item => (
          <div key={item.id} className="p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="bg-retroBackground border-4 border-retroBorder p-6 rounded-sm text-center"
            >
              <h2 className="text-3xl font-extrabold mb-4">{item.heading}</h2>
              <p className="text-xl">{item.subheading}</p>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
