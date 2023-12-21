import React, { useEffect, useState, useCallback } from 'react';
import { useOutletContext } from "react-router-dom";
import ToggleSwitch from '../components/ToggleSwitch';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RecipeCard from '../components/RecipeCard';
import CreateRecipeButton from '../components/CreateRecipeButton';
import CreateRecipe from '../components/CreateRecipe';
import UpdateRecipe from '../components/UpdateRecipe';

const Dashboard = () => {
  const [isToggled, setIsToggled] = useState(true); // true for 'My Recipes', false for 'Favorites'
  const [userData, setUserData] = useOutletContext();
  const [userRecipes, setUserRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen]= useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState({})
  const [userFavs, setUserFavs] = useState([])
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(()=>{
    setUserRecipes(userData.recipes)
    console.log(userData.recipes)
  },[])
  
  useEffect(()=>{
    setUserFavs(userData.favorites)

  },[])
  
  const toggle = () => {
    setIsToggled(!isToggled);
  
  }


 

  return (
    <>
   
      <div  className='flex h-full min-h-screen justify-center items-center bg-bg7 '>
        <div  className='w-4/5 h-full min-h-screen bg-beige dark:bg-brown'>
          <div className='m-3'>
            <CreateRecipeButton setIsModalOpen={setIsModalOpen} />
          </div>
          <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
            <ToggleSwitch toggle={toggle} isToggled={isToggled} />
          </div>
          <div className="sm:ml-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
           {isToggled? (
              userFavs ? (
                userFavs.map((recipe, index)=>{
                return  <RecipeCard owned={false} setIsModalOpen={setIsEditOpen} setSelectedRecipe={setSelectedRecipe} recipe={recipe} key={index} />
                })):(<div className='block h-screen'><h1>no recipes</h1></div>)
            ):(
              userRecipes ? (
                userRecipes.map((recipe, index)=>{
                return  <RecipeCard owned={true} setIsModalOpen={setIsEditOpen} setSelectedRecipe={setSelectedRecipe} recipe={recipe} key={index} />
                })):( <div className='h-screen'><h1>no recipes</h1></div>)
              )  
           }
          </div>
         
        </div>
      </div>
      <CreateRecipe userData={userData} userRecipes={userRecipes} setUserRecipes={setUserRecipes} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <UpdateRecipe userData={userData} userRecipes={userRecipes} setUserRecipes={setUserRecipes} selectedRecipe={selectedRecipe} isEditOpen={isEditOpen} onCloseEdit={()=>setIsEditOpen(false)} />
      
    </>
  );
};

export default Dashboard;
