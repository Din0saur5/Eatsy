import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Replace with your preferred icon

const CreateRecipeButton = () => {
  return (
    <button className="button-container relative flex items-center bg-blue-500 text-white rounded overflow-hidden transition-all duration-300 px-2 py-2">
    <FaPlus className="w-6 h-6" />
    <span className="button-text absolute whitespace-nowrap ml-2 opacity-0">
      Create Recipe
    </span>
  </button>
  );
};

export default CreateRecipeButton;
