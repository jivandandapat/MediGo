import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { HeroSection } from '../components/HeroSection/HeroSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div>
        <HeroSection />
      </div>
    </div>
  );
};

export default Home;