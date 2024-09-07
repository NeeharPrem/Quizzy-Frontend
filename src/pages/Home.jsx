import React from 'react';
import { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import MainScreen from '../components/Home/MainScreen';
import Hero from '../components/common/Hero';

const Home = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            {/* <div>
                <Hero/>
            </div> */}
            <div className='flex-grow p-4'>
                <MainScreen />
            </div>
            <Footer />
        </div>
    );
};

export default Home;