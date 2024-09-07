import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Questions from '../components/Quiz/Questions';

const QuizMain = () => {
    return (
        <div className='flex flex-1 flex-col min-h-screen'>
            <Navbar />
            <div className='flex flex-row flex-1'>
                <div className='w-full sm:w-1/5 md:w-2/5 lg:w-3/5 xl:w-4/5 p-2'>
                    <Questions/>
                </div>
                <div className='bg-yellow-300 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/5'>
                    <h2>first</h2>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default QuizMain;