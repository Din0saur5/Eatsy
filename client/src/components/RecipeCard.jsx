/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RiDraftLine } from "react-icons/ri";
import ImageWithFallback from './ImageWithFallBack';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import LikeButton from '../components/LikeButton';
import { useOutletContext} from 'react-router-dom';


const RecipeCard = ({owned=false, setIsModalOpen, setSelectedRecipe , favorited=false, recipe}) => {
    const handleEdit = () => {
      setSelectedRecipe(recipe)
      setIsModalOpen(true)
    }
    const  {name, time, image, id, reviews } = recipe
    const [userData, setUserData] = useOutletContext();
    const avgRating = Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / recipe.reviews.length)
    let avgStars = ''
    for(let i = 0; i < avgRating; i++){
      avgStars += '⭐'}
    

  return (
    


<div data-aos="fade-up ">
<div className="relative w-full h-auto max-w-sm bg-gray-200 dark:bg-gray-800 rounded-lg shadow bg-pink border border-gray-400 dark:border-gray-400">
    {owned ? (
        <button onClick={() => handleEdit()} className="absolute top-2 right-2 p-2 text-white bg-blue-500 hover:bg-blue-700 rounded">
            <RiDraftLine />
        </button>
    ) : (

      <div class="container mx-auto p-4">
      <div class="card bg-white rounded-lg shadow-lg relative overflow-hidden">
    <!-- Ribbon -->
    <div class="ribbon bg-green-500 text-white py-1 px-4">
      <svg class="h-6 w-6 inline-block text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <!-- You can replace this SVG with a heart icon from your icon library -->
        <path d="M10 3a5 5 0 0110 0 ..."></path>
      </svg>
      <span>Favorites</span>
    </div>
        userData && (
            <LikeButton 
                recipe_id={recipe.id} 
                user_id={userData.id} 
                favorited={recipe.favorites?.includes(userData.id)}
            />
        )
    )}
    <Link to={`/recipe/${id}`} >
    <ImageWithFallback
    cN={"p-8 rounded-t-lg"}
      src={image}
      alt="name"
    />
    </Link>
    <div className="px-5 pb-5">
        <Link to={`/recipe/${id}`} >
            <h5 className="line-clamp-2 h-16 text-xl  font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
             {avgStars}
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">{avgRating? avgRating: 0}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white"><small>Cook Time:</small> <p>{time} mins</p>   </span>
            <Link to={`/recipe/${id}`} className="text-white bg-green-700 hover:bg-raspberry hover:text-beige focus:ring-4 focus:outline-none focus:ring-beige-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-raspberry dark:hover:text-beige dark:focus:ring-green-800">Cook Tonight!</Link>
        </div>
    </div>
</div>
</div>
  )
}

export default RecipeCard
