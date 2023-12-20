import React, { useState } from 'react';

const ToggleSwitch = ({toggle , isToggled }) => {
  

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-72 h-16 bg-gray-300 dark:bg-darkBrown rounded-full p-1 cursor-pointer" onClick={toggle}>
        {/* Sliding background */}
        <div className={`absolute left-0 top-0 h-16 w-1/2 bg-green-400 dark:bg-green-700 rounded-full transition-transform duration-300 ${isToggled ? 'translate-x-full' : 'translate-x-0'}`}></div>
        {/* Text labels */}
        <div className="flex justify-between items-center h-full w-full px-4">
          <span className={`text-lg dark:text-gray-100 font-bold z-10 transition-opacity duration-300 ${isToggled ? 'opacity-50' : 'opacity-100'}`}>My Recipes</span>
          <span className={`text-lg dark:text-gray-100 font-bold z-10 transition-opacity duration-300 ${isToggled ? 'opacity-100' : 'opacity-50'}`}>Favorites</span>
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
