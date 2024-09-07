import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuizForm from '../components/Quiz/QuizForm';

function Create() {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='sm:flex-row w-full p-4' style={{ height: 'calc(100vh - 64px)' }}> {/* Adjust height to take full height */}
                <div style={{ height: '100%' }}>
                    <QuizForm />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Create;