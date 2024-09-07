import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
      <div className="flex flex-row justify-evenly navbar bg-base-100 p-5 border-b mb-2">
          <div className="flex-1">
              <Link to="/" className="font-bold text-3xl">Quizzy</Link>
          </div>
          <div className="flex-1 flex justify-center gap-4 sm:gap-2 md:gap-12 lg:gap-16">
        <Link to={'/create'}> <h2 className='font-semibold lg:text-md sm:text-sm'>Create quiz</h2></Link>
              <h2 className='font-semibold lg:text-md sm:text-sm'> Leader boards</h2>
              <h2 className='font-semibold lg:text-md sm:text-sm'>About us</h2>
          </div>
          <div className="flex-1 flex justify-end">
            <Link to={'/login'}><button>Join now</button></Link>
          </div>
      </div>
  );
}

export default Navbar;