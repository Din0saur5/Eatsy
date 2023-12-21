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
  console.log(userData.favorites? true:false)
  const [userRecipes, setUserRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen]= useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState({})

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const toggle = () => {
    setIsToggled(!isToggled);
    if (!isToggled && (userData.favorties)){
      setUserRecipes(userData.favorites)
      
    }else if(!isToggled && (!userData.favorties)){
        setUserRecipes([])
    }else if (isToggled && (userData.recipes)){
      setUserRecipes(userData.recipes)
      console.log(`recipes ${userRecipes}`)
    } else{
      setUserRecipes([])
    }
  }


  const RecipeList = () => {
    return userData.recipes.length === 0  ? (<></>):(
      
      <>
        {userRecipes.map((recipe, index) => {
          return <RecipeCard owned={(userRecipes===userData.recipes)} setIsModalOpen={setIsEditOpen} setSelectedRecipe={setSelectedRecipe} recipe={recipe} key={index} />
        })}
      </>
    );
  };

  return (
    <>
      <div className='flex justify-center items-center bg-bg7'>
        <div className='w-4/5 bg-beige dark:bg-brown'>
          <div className='m-3'>
            <CreateRecipeButton setIsModalOpen={setIsModalOpen} />
          </div>
          <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
            <ToggleSwitch toggle={toggle} isToggled={isToggled} />
          </div>
          <div className="sm:ml-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userRecipes.length > 0 ? (<RecipeList  list={userRecipes} />):(<div className='h-screen'><h1>no recipes</h1></div>) }
              
          </div>
          {/* Removed the 'Load More' button since infinite scroll is implemented */}
        </div>
      </div>
      <CreateRecipe userData={userData}  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <UpdateRecipe userData={userData} selectedRecipe={selectedRecipe} isEditOpen={isEditOpen} onCloseEdit={()=>setIsEditOpen(false)} />
    </>
  );
};

export default Dashboard;
