import React, { useEffect, useState } from 'react'
import Review from '../components/Review';
import { useOutletContext, useParams } from "react-router-dom";
import LikeButton from '../components/LikeButton';
import ImageWithFallback from '../components/ImageWithFallBack';
import Modal from '../components/Modal';
import CreateReviewForm from '../components/CreateReviewForm';
import CreateReviewButton from '../components/CreateReviewButton';

const Recipe = () => {
  const { id } = useParams()
  console.log(id)
  const [userData, setUserData] = useOutletContext()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState({})
  const server = import.meta.env.VITE_BACK_END_SERVE
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionMaxLength = 200;

  const openDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
  };

  const closeDescriptionModal = () => {
    setIsDescriptionModalOpen(false);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

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
  },[isModalOpen])
  const ingredients = []
  for(let i in recipe.ingredients)
  {
    ingredients.push(recipe.ingredients[i].text)
  }
  const handleReviewDelete = async (review) => {
    const server = import.meta.env.VITE_BACK_END_SERVE;
    console.log(server)
    const response = await fetch(`${server}/reviews/${review.id}/${userData.id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      fetchRecipe();
    }
  }
  const reviews = []
  for(let i in recipe.reviews)
  {
    reviews.push(
      <Review 
        review = {recipe.reviews[i]} 
        key={recipe.reviews[i].id}
        handleDelete={() => handleReviewDelete(recipe.reviews[i])}/>
    )
  }

  let descriptionDisplay = '';
  if (recipe.description) {
    if (showFullDescription || recipe.description.length <= descriptionMaxLength) {
      descriptionDisplay = recipe.description;
    } else {
      descriptionDisplay = truncateText(recipe.description, descriptionMaxLength);
    }
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
    const avgRating = Math.round(recipe.reviews.reduce((sum, review) => sum + review.rating, 0) / recipe.reviews.length)
    let avgStars = ''
    for(let i = 0; i < avgRating; i++){
      avgStars += '⭐'
    }
    contents =
    <div className='bg-[#F5E8D6]'>
      <div className='min-h-screen bg-background1 bg-cover'>
        <div className='text-black'>
          <div className="text-center p-6 font-bold">
            <h1 className='inline-flex bg-[#F5E8D6] bg-opacity-50 pb-2 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.5)]'>{recipe.name}</h1>
            <h3>Average Rating: {avgStars}</h3>
          </div>
          <div className='md:grid md:grid-cols-2 m-4 max-w-[1480px] mx-auto'>
            <div className='bg-old-paper p-10 pt-20 pl-24'>
              <div className='flex justify-between'>
                <ImageWithFallback 
                src={recipe.image} 
                cN="aspect-square w-1/2 mb-4 rounded-lg object-contain"  
                alt={`Image of ${recipe.name}`}/>
                 <div className='bg-[#F5E8D6] text-center bg-opacity-40 p-2 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.4)]'>
                  <p className='italic'>
                    {truncateText(recipe.description, descriptionMaxLength)}
                  </p>
                  {recipe.description && recipe.description.length > descriptionMaxLength &&
                    <button onClick={openDescriptionModal} className="text-blue-500 hover:underline">Read More</button>
                  }
                </div>
                <Modal 
                    isOpen={isDescriptionModalOpen} 
                    onClose={closeDescriptionModal} 
                    userData={userData} 
                    content={
                      <div>
                        <h2>Description</h2>
                        <p>{recipe.description}</p>
                        <button onClick={closeDescriptionModal}>Close</button>
                      </div>
                    }
                  />
              </div>
              {userData? 
                (`${recipe.favorites.includes(userData.id)}`+<LikeButton 
                  recipe_id={recipe.id} 
                  user_id={userData.id} 
                  favorited={recipe.favorites.includes(userData.id)}/>
                ):(
                  <LikeButton 
                  recipe_id={recipe.id} 
                  user_id={null} 
                  favorited={false}/>
                )
                }
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
      <div>{userData? (
        <>
        <CreateReviewButton setIsModalOpen={setIsModalOpen}/>
        <Modal
          isOpen={isModalOpen}
          content = {
            <CreateReviewForm 
              handleClose={() => setIsModalOpen(false)}
              user_id={userData.id}
              recipe_id={recipe.id}/>}
            />
        </>
      ):(
        <></>

      )}
        {reviews}
      </div>
    </div>
  }
  return (
    <>
      {contents}
    </>
  )
}

export default Recipe
