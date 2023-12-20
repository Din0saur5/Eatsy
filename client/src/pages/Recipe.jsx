import React, { useEffect, useState } from 'react'

import { useOutletContext, useParams } from "react-router-dom";

const Recipe = () => {
  const { id } = useParams()
  console.log(id)
  const [userData, setUserData] = useOutletContext();
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState({})
  const server = import.meta.env.VITE_BACK_END_SERVE
  const fetchRecipe = async () => {
    try{
      const response = await fetch(`${server}/recipes/${id}`, {
        credentials:'include',
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      })
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
  const reviews = []
  for(let i in recipe.reviews)
  {
    reviews.push(
      <div key={reviews[i].id} className='bg-white p-6 radius-lg'>
        <h4>{recipe.reviews[i].title}</h4>
        <p>{recipe.reviews[i].comment}</p>
      </div>
    )
  }
  let contents
  if(error){
    contents = <div className='bg-red'>Whoops! There was an error: {error}</div>
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
    <div className='text-black'>
      <div className="text-center p-6 font-bold">
        <h1 style={{textShadow:'-1px 1px 8px #F5E8D6'}}>{recipe.name}</h1>
      </div>
      <div className='md:grid md:grid-cols-2 m-4'>
        <div className='bg-old-paper p-6 pl-10'>
          <img 
          src={recipe.image} 
          className="h-96 w-96 mx-auto rounded-lg" 
          title={recipe.name} 
          alt={`Image of ${recipe.name}`}/>
          <h2 className='text-center'>Ingredients</h2>
          <ul className='list-disc pl-4 font-semibold'>{ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}</ul>
        </div>
        <div className='bg-old-paper p-6 pl-10 bg-right-top'>
          <h2 className='text-center'>Steps</h2>
          <ol className='list-decimal'>{recipe.steps?recipe.steps.map(instruction => <li key={instruction}>{instruction}</li>):''}</ol>
        </div>
      </div>
      {reviews}
    </div>
  }
  return (
    <>
    <div className='min-h-screen bg-background1 bg-cover'>

      {contents}
      
    </div>
    </>
  )
}

export default Recipe
