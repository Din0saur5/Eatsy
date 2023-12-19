import React, { useEffect, useState } from 'react'

import { useOutletContext, useParams } from "react-router-dom";

import Navbar from '../components/Navbar'
const Recipe = () => {
  const { id } = useParams()
  console.log(id)
  const [userData, setUserData] = useOutletContext();
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState({})
  const server = import.meta.env.VITE_BACK_END_SERVE
  const fetchRecipe = async () => {
    try{
      const response = await fetch(`${server}/recipes/${id}`)
      if(!response.ok){
        setError(`HTTP error! Status: ${response.status}`)
      }
      const recipeData = await response.json()
      setRecipe(recipeData)
    }catch(err){
      setError(err.message)
    }
  }
  useEffect(() => {
    fetchRecipe()
  },[])
  let contents
  if(error){
    contents = <div>Whoops! There was an error: {error}</div>
    console.log(error)
  }
  else if(!recipe){
    contents = 
    <div>
      <h2>Loading...</h2>
      <img src="images/load-37_256.gif" />
    </div>
  }
  else{
    contents = 
    <>
      <div className="">
        <h1>{recipe.name}</h1>
      </div>
      <div className='flex'>
        <div className='flex'>
          <img src={recipe.image} className="h-96 w-96"/>
        </div>
      </div>
    </>
  }
  return (
    <>
    <Navbar/>
    <div>

      {contents}
      
    </div>
    </>
  )
}

export default Recipe
