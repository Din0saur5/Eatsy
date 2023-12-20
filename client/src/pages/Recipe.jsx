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
  const ingredients = []
  for(let i in recipe.ingredients)
  {
    ingredients.push(recipe.ingredients[i].text)
  }
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
    <div className='text-forest_green font-cormorant'>
      <div className="text-center p-6 font-bold">
        <h1 style={{textShadow:'-1px 1px 8px #F5E8D6'}}>{recipe.name}</h1>
      </div>
      <div className='md:grid md:grid-cols-2 md:gap-4 m-4'>
        <div className='bg-beige p-4 pl-7 shadow-[0_0_5px_5px_#F5E8D6]'>
          <img src={recipe.image} className="h-96 w-96 mx-auto rounded-lg" title={recipe.name} alt={`Image of ${recipe.name}`}/>
          <h2 className='text-center'>Ingredients</h2>
          <ul className='list-disc'>{ingredients.map(ingredient => <li>{ingredient}</li>)}</ul>
        </div>
        <div className='bg-beige p-4 pl-9 shadow-[0_0_5px_5px_#F5E8D6]'>
          <h2 className='text-center'>Steps</h2>
          <ol className='list-decimal'>{recipe.steps?recipe.steps.map(instruction => <li>{instruction}</li>):''}</ol>
        </div>
      </div>
    </div>
  }
  return (
    <>
    <Navbar/>
    <div className='min-h-screen bg-background1 bg-cover'>

      {contents}
      
    </div>
    </>
  )
}

export default Recipe
