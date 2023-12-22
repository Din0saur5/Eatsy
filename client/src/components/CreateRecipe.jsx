import React, { useEffect, useState } from 'react'


import CreateRecipeForm from './CreateRecipeForm';

const CreateRecipe = ({ isOpen, onClose, userData }) => {
 const [showModal, setShowModal] = useState(isOpen); 

  useEffect(() => {
 
    setShowModal(isOpen); 
  }, [isOpen]);
  const handleClose = () => {
    // Start the slide up animation
    setShowModal(false);
    // Set a timeout to match the animation duration
    setTimeout(() => {
      onClose();
    }, 500); // 500ms should match the CSS animation duration
  };

  if (!isOpen) return null;
  return (
    <>
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
      <div className={` modal-content bg-white rounded p-4 w-full max-w-lg mx-4 md:mx-0 ${showModal ? 'animate-slideDown' : 'animate-slideUp'}`}>
        <CreateRecipeForm handleClose={handleClose} userData={userData} />
        
      </div>
    </div>
    </>
  )
}

export default CreateRecipe
//steps are in array