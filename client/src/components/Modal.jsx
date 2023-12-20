import React from 'react'

import { useOutletContext } from "react-router-dom";
import CreateRecipeForm from './CreateRecipeForm';

const CreateRecipe = ({ isOpen, onClose, userData, content }) => {
  

  if (!isOpen) return null;
  return (
    <>
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
      <div className="modal-slide-down bg-white rounded p-4 w-full max-w-lg mx-4 md:mx-0">
        {content}
        <div className="text-lg">This is a modal!</div>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close Modal</button>
      </div>
    </div>
    </>
  )
}

export default Modal