import React, { useEffect, useState } from 'react';
import Review from '../components/Review';
import LikeButton from '../components/LikeButton';
import ImageWithFallback from '../components/ImageWithFallBack';
import Modal from '../components/Modal';
import CreateReviewForm from '../components/CreateReviewForm';
import CreateReviewButton from '../components/CreateReviewButton';
import { useOutletContext, useParams } from 'react-router-dom';

const Recipe = () => {
  const { id } = useParams();
  const [userData, setUserData] = useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState({});
  const [quantity, setQuantity] = useState(1);
  const server = import.meta.env.VITE_BACK_END_SERVE;
  const descriptionMaxLength = 470;
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`${server}/recipes/${id}`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        setError(`HTTP error! Status: ${response.status}`);
      }
      const recipeData = await response.json();
      setRecipe(recipeData);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    fetchRecipe();
  }, [id, server, isModalOpen]);

  const ingredients = recipe.ingredients ? recipe.ingredients.map(i =>{ 
    if(quantity == 1){
      return i.text
    } else {
      return `${i.quantity*quantity} ${i.unit} ${i.food}`
    }
  }) : [];
  const reviews = recipe.reviews ? recipe.reviews.map(review => (
    <Review review={review} key={review.id} />
  )) : [];

  const toggleDescriptionModal = () => {
    setIsDescriptionModalOpen(!isDescriptionModalOpen);
  };

  let contents;
  if (error) {
    contents = (
      <div className='min-h-screen bg-background1 bg-cover'>
        <div className='flex items-center justify-center h-screen'>
          <h4 className='bg-red'>Whoops! There was an error: {error}</h4>
        </div>
      </div>
    );
  } else if (!recipe.id) {
    contents = (
      <div className='min-h-screen bg-background1 bg-cover'>
        <div className="flex items-center justify-center h-screen">
          <h2 className='block'>Loading...</h2>
          <img src="/images/load-37_256.gif" className='block'/>
        </div>
      </div>
    );
  } else {
    contents = (
      <div className='bg-[#F5E8D6]'>
        <div className='min-h-screen bg-background1 bg-cover bg-fixed'>
          <div className='text-black'>
            <div className="text-center p-6 font-bold">
              <h1 className='inline-flex bg-[#F5E8D6] bg-opacity-50 pb-2 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.5)]'>{recipe.name}</h1>
            </div>
            <div className='md:grid md:grid-cols-2 m-4 max-w-[1480px] mx-auto'>
              <div className='bg-old-paper bg-cover p-10 pt-20 pl-24'>
                <div className='flex justify-between'>
                  <ImageWithFallback 
                    src={recipe.image} 
                    cN="aspect-square w-1/2 mb-4 rounded-lg object-contain"  
                    alt={`Image of ${recipe.name}`}
                  />
                   <div className='text-description bg-[#F5E8D6] bg-opacity-40 pb-2 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.4)]'>
            <p className='text-center line-clamp-6 lg:line-clamp-[10] font-[literata-italic]'>{recipe.description}</p>
              <button onClick={toggleDescriptionModal} className="text-blue-500 hover:underline">
                Full Description
              </button>
            <Modal 
              isOpen={isDescriptionModalOpen} 
              onClose={toggleDescriptionModal} 
              content={
                <div>
                  <h2>Description</h2>
                  <p>{recipe.description}</p>
                  <button onClick={toggleDescriptionModal}>Close</button>
                </div>
              }
            />
          </div>
                </div>
                <div className='flex flex-row justify-between'>
                  <div>
                    {userData && (
                      <LikeButton 
                        recipe_id={recipe.id} 
                        user_id={userData.id} 
                        favorited={recipe.favorites.includes(userData.id)}
                      />
                    )} &emsp;{recipe.favorites.length}
                  </div>
                    <div>
                      <p>Multiply by: </p>
                      <input 
                        type='number'
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        className='rounded-lg'
                        min={0.25}/>
                    </div>
                </div>
                <div className='bg-[#F5E8D6] bg-opacity-40 pb-2 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.4)]'>
                  <h2 className='text-center'>Ingredients</h2>
                  <ul className='list-disc pl-4 font-semibold'>
                    {ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
                  </ul>
                </div>
              </div>
              <div className='bg-old-paper p-20 bg-right-top bg-cover pl-12'>
                <div className='bg-[#F5E8D6] bg-opacity-40 pl-8 pb-2 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.4)]'>
                  <h2 className='text-center'>Steps</h2>
                  <p>{recipe.time? `Time: ${recipe.time} minutes`:''}</p>
                  <ol className='list-decimal'>
                    {recipe.steps && recipe.steps.map(instruction => <li key={instruction}>{instruction}</li>)}
                  </ol>
                  <div className='text-center p-6 font-bold'>
                    <div className="print-button-container">
                      <button 
                        onClick={handlePrint} 
                        className="print-button"
                        style={{ fontSize: '30px' }}
                      >
                        Click to Print Recipe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
          {userData && (
            <>
              <div className='ml-4'>
                <CreateReviewButton 
                  setIsModalOpen={setIsModalOpen}/>
              </div>
              <Modal
                isOpen={isModalOpen}
                content={
                  <CreateReviewForm 
                    handleClose={() => setIsModalOpen(false)}
                    user_id={userData.id}
                    recipe_id={recipe.id}
                  />
                }
              />
            </>
          )}
          {reviews}
        </div>


        </div>
      </div>
    );
  }

  return <>{contents}</>;
};

export default Recipe;
