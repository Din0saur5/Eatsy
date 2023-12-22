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
    


<div data-aos="fade-up" className='justify-center items-center'>
<div className="relative  w-full h-auto  bg-gray-200 dark:bg-gray-800 rounded-lg shadow bg-pink border border-gray-400 dark:border-gray-400">
    {owned ? (
      <div className="absolute rounded-bl-lg rounded-tl-xxl top-14 right-3 rotate-90 bg-blue-ribbon text-white py-1 px-4 transform -translate-y-full ribbon-blue ">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4  w-4 inline-block mr-1 text-transparent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
        <button onClick={() => handleEdit()} className=" -rotate-90 hover:blue-500 hover:bg-blue-700 rounded  p-2 text-white  text-white">
            <RiDraftLine />
        </button>
        
    </div>
    ) : ( //need this Likebutton Component to go on the ribbon
        userData && (
        <div className="absolute rounded-bl-lg rounded-tl-xxl top-14 right-3 rotate-90 bg-ribbon text-white py-1 px-4 transform -translate-y-full ribbon ">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4  w-4 inline-block mr-1 text-transparent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
      
        <LikeButton 
          cN={'-rotate-90 bg-transparent'}
            recipe_id={recipe.id} 
            user_id={userData.id} 
            favorited={recipe.favorites?.includes(userData.id)}
            />
        
     
    </div>
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
