// src/pages/Home.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import CityMenu from '../components/CityMenu';
import Gallery from '../components/Gallery';

const Home = () => {
  const [selectedCity, setSelectedCity] = useState("همه");

  return (
    <>
      <Header />
      <CityMenu selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <Gallery selectedCity={selectedCity} />
    </>
  );
};

export default Home;
