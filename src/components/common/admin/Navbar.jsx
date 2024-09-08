import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
      <div className="flex flex-row justify-evenly navbar bg-base-100 p-5 border-b mb-2">
          <div className="flex-1">
              <Link to="/" className="font-bold text-3xl">Quizzy</Link>
          </div>
         <div>
          <button className='bg-red-400 w-16 h-10 btn'>Logout</button>
         </div>
      </div>
  );
}

export default Navbar;