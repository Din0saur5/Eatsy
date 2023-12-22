/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RiDraftLine } from "react-icons/ri";
import ImageWithFallback from './ImageWithFallBack';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";


const RecipeCard = ({owned=false, setIsModalOpen, setSelectedRecipe , favorited=false, recipe}) => {
    console.log(owned)
    const handleEdit = () => {
      setSelectedRecipe(recipe)
      console.log(recipe)
      setIsModalOpen(true)
    }
    const  {name, time, image, id} = recipe
  return (
    


<div data-aos="fade-up ">
<div className=" relative w-full h-auto max-w-sm bg-gray-200 dark:bg-gray-800 rounded-lg shadow bg-pink border border-gray-400 dark:border-gray-400">
{owned ? (
        <button onClick={()=>handleEdit()}  className="absolute top-2 right-2 p-2 text-white bg-blue-500 hover:bg-blue-700 rounded"><RiDraftLine /></button> 
      ) : (
        <button  className="absolute top-1 right-4 p-2 text-white bg-green-500 hover:bg-green-700 rounded">{favorited? <FaRegHeart />:<FaHeart />
    }</button>
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
            {/* {const avgRating = Math.round(recipe.reviews.reduce((sum, review) => sum + review.rating, 0) / recipe.reviews.length)
              let avgStars = ''
              for(let i = 0; i < avgRating; i++){
                avgStars += '⭐'
              }   } */}
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">5.0</span>
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
