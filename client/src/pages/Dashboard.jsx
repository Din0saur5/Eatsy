import React, { useEffect, useState, useCallback } from 'react';
import { useOutletContext } from "react-router-dom";
import ToggleSwitch from '../components/ToggleSwitch';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RecipeCard from '../components/RecipeCard';
import CreateRecipeButton from '../components/CreateRecipeButton';
import UpdateRecipe from '../components/UpdateRecipe';

const Dashboard = () => {
  const [isToggled, setIsToggled] = useState(true); // true for 'My Recipes', false for 'Favorites'
  const [userData, setUserData] = useOutletContext();
  const [userRecipes, setUserRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen]= useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState({})
  const [userFavs, setUserFavs] = useState([])
  const server = import.meta.env.VITE_BACK_END_SERVE
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(()=>{
    const limit = 10; 
    const offset = 0;
    fetch(`${server}/favs/${userData.id}?limit=${limit}&offset=${offset}`,{
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Specify the content type header
      },
    }).then(r=>r.json())
    .then(d=>setUserFavs(d))
    
  
  },[])

  
  useEffect(()=>{
    const limit = 10; 
    const offset = 0;
    fetch(`${server}/rbu/${userData.id}?limit=${limit}&offset=${offset}`,{
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Specify the content type header
      },
    }).then(r=>r.json())
    .then(d=>setUserRecipes(d))


  },[])
  
  const toggle = () => {
    setIsToggled(!isToggled);
  
  }


 

  return (
    <>
   
      <div  className='flex h-full min-h-screen justify-center items-center bg-bg7 '>
        <div  className='w-4/5 h-full min-h-screen bg-beige dark:bg-brown'>
          <div className='m-3'>
            <CreateRecipeButton/>
          </div>
          <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
            <ToggleSwitch toggle={toggle} isToggled={isToggled} />
          </div>
          <div className="lg:ml-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
           {isToggled? (
              userFavs.length >0 ? (
                userFavs.map((recipe, index)=>{
                return  <RecipeCard owned={false} setIsModalOpen={setIsEditOpen} setSelectedRecipe={setSelectedRecipe} recipe={recipe} key={index} />
                })):(<div className='block h-screen'><h2>No Favorites Yet, Start Liking Recipes</h2></div>)
            ):(
              userRecipes.length >0 ? (
                userRecipes.map((recipe, index)=>{
                return  <RecipeCard owned={true} setIsModalOpen={setIsEditOpen} setSelectedRecipe={setSelectedRecipe} recipe={recipe} key={index} />
                })):( <div className='h-screen'><h1>No Recipes Yet, Start Creating Recipes</h1></div>)
              )  
           }
          </div>
         
        </div>
      </div>
      <UpdateRecipe userData={userData} userRecipes={userRecipes} setUserRecipes={setUserRecipes} selectedRecipe={selectedRecipe} isEditOpen={isEditOpen} onCloseEdit={()=>setIsEditOpen(false)} />
    </>
  );
};

export default Dashboard;
