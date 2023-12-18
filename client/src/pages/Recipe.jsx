import React from 'react'

import { useOutletContext, useParams } from "react-router-dom";

import Navbar from '../components/Navbar'
const Recipe = () => {
  const {id} = useParams()  
  const [userData, setUserData] = useOutletContext();
  return (
    <>
    <Navbar/>
    <div>
    
    
      <h1>Hello World</h1>
      
    </div>
    </>
  )
}

export default Recipe
