import React from 'react'
import Navbar from '../components/Navbar'
import { useOutletContext } from "react-router-dom";

const CreateRecipe = () => {
  const [userData, setUserData] = useOutletContext();
  return (
    <>
    <Navbar/>
    <div>
      
    </div>
    </>
  )
}

export default CreateRecipe
