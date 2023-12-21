import React, { useEffect, useState } from 'react'
import Review from '../components/Review';
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
      <Review review = {recipe.reviews[i]}/>
    )
  }
  let contents
  if(error){
    contents = 
    <div className='min-h-screen bg-background1 bg-cover'>
      <div className='flex items-center justify-center h-screen'>
        <h4 className='bg-red'>Whoops! There was an error: {error}</h4>
      </div>
    </div>
    console.log(error)
  }
  else if(!recipe.id){
    contents = 
    <div className='min-h-screen bg-background1 bg-cover'>
      <div className="flex items-center justify-center h-screen">
        <h2 className = 'block'>Loading...</h2 >
        <img src="/images/load-37_256.gif" className='block'/>
      </div>
    </div>
  }
  else{
    contents =
    <div className='bg-[#F5E8D6]'>
      <div className='min-h-screen bg-background1 bg-cover'>
        <div className='text-black'>
          <div className="text-center p-6 font-bold">
            <h1 className='inline-flex bg-[#F5E8D6] bg-opacity-40 pb-2 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.4)]'>{recipe.name}</h1>
          </div>
          <div className='md:grid md:grid-cols-2 m-4 max-w-[1480px] mx-auto'>
            <div className='bg-old-paper p-20 pl-24'>
              <div className='flex justify-between'>
                <img 
                src={recipe.image} 
                className="aspect-square w-1/2 mb-4 rounded-lg object-contain" 
                title={recipe.name} 
                alt={`Image of ${recipe.name}`}/>
                <p className=' italic text-center bg-[#F5E8D6] bg-opacity-40 p-2 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.4)]'>{recipe.description}<br />
                {recipe.source?
                <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
                href={recipe.source}
                target='_blank'>Source</button>:''}</p>
              </div>
              <div className='bg-[#F5E8D6] bg-opacity-40 pb-2 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.4)]'>
                <h2 className='text-center'>Ingredients</h2>
                <ul className='list-disc pl-4 font-semibold'>{ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}</ul>
              </div>
            </div>
            <div className='bg-old-paper p-20 bg-right-top pl-12'>
              <div className='bg-[#F5E8D6] bg-opacity-40 pl-8 pb-2 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.4)]'>
                <h2 className='text-center'>Steps</h2>
                <ol className='list-decimal'>{recipe.steps?recipe.steps.map(instruction => <li key={instruction}>{instruction}</li>):''}</ol>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      {reviews}
    </div>
  }
  return (
    <>
      {contents}
    </>
  )
}

export default Recipe
