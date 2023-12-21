import React, { useEffect, useState } from 'react'
import UpdateRecipeForm from './UpdateRecipeForm'


const UpdateRecipe = ({ isEditOpen, selectedRecipe, onCloseEdit, userData }) => {
 const [showModal, setShowModal] = useState(isEditOpen); 

  useEffect(() => {
    setShowModal(isEditOpen); 
  }, [isEditOpen]);
  const handleClose = () => {
    // Start the slide up animation
    setShowModal(false);
    // Set a timeout to match the animation duration
    setTimeout(() => {
      onCloseEdit();
    }, 500); // 500ms should match the CSS animation duration
  };

  if (!isEditOpen) return null;
  return (
    <>
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
      <div className={` modal-content bg-white rounded p-4 w-full max-w-lg mx-4 md:mx-0 ${showModal ? 'animate-slideDown' : 'animate-slideUp'}`}>
        <UpdateRecipeForm handleClose={handleClose} selectedRecipe={selectedRecipe} userData={userData} />
        
      </div>
    </div>
    </>
  )
}

export default UpdateRecipe
//steps are in array