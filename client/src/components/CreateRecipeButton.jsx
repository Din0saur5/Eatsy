import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateRecipeButton = () => {
  const navigate = useNavigate(); // Create a navigate function

  const handleClick = () => {
    navigate('/create-new-recipe'); // Navigate to the new route when clicked
  };

  return (
    <button onClick={handleClick} className="create_new flex items-center bg-blue-500 text-white rounded p-2 overflow-hidden relative transition-all duration-500">
      <FaPlus className="w-6 h-6" />
      <span className="ml-2 whitespace-nowrap overflow-hidden max-w-0 hover:transition-all duration-1000 ease-in-out group-hover:max-w-xs">
        Create Recipe
      </span>
    </button>
  );
};

export default CreateRecipeButton;
