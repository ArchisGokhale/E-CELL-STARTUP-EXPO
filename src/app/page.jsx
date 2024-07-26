"use client"

import React, { useState } from 'react';
import Loading from '../components/Loading';
import Hero from '@components/Hero';
import Carousel from '@components/Carousel';
import WhatDoWeOffer from '@components/WhatDoWeOffer';
import PreviousPartners from '@components/PreviousPartners';
import Footer from '@components/Footer';

const Home = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Loading onComplete={handleLoadingComplete} />
      ) : (
        <div className=''>
          <Hero />
          <Carousel />
          <WhatDoWeOffer />
          <PreviousPartners />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Home;
