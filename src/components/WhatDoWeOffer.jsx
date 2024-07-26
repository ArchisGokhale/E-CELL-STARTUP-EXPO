import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const offerings = [
  {
    id: 1,
    heading: 'For Students',
    points: ['Learn about industry trends, research advancements, and future opportunities', 'Connect with entrepreneurs, professionals, and investors to build your network.', 'Explore internships for practical experience.', 'Pitch projects and ideas for financial support.'],
  },
  {
    id: 2,
    heading: 'For Startups',
    points: ['Pitch your startup to venture capitalists and investors.', 'Showcase your solutions to a broad audience and refine your strategies with expert feedback.', "Find skilled students to join your team and support your startup's growth.", "Test your products with potential buyers and receive constructive feedback."],
  },
  {
    id: 3,
    heading: "For VC's",
    points: ['Discover New Ventures and Investment Opportunities.', 'Discover diverse startups and invest in emerging ventures across various domains', 'Network with experts, venture capitalists, and industrialists across multiple sectors', 'Add high-potential startups to diversify and strengthen your investment portfolio.'],
  },
];

const WhatWeOffer = () => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const targetText = 'What Do We Offer';
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const containerRef = useRef(null);

  useEffect(() => {
    const getRandomString = () => {
      const segments = ['______', '____', '____'];
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

  return (
    <div className="p-6 md:py-36" ref={containerRef}>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8">
        {displayText}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offerings.map(offer => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="bg-retroBackground border-4 border-retroBorder p-6 rounded-sm text-center"
          >
            <h2 className="text-3xl font-extrabold mb-4">{offer.heading}</h2>
            <ul className="list-disc list-inside">
              {offer.points.map((point, index) => (
                <li key={index} className="text-xl">{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;
