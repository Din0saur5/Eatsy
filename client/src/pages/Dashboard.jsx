// Dashboard.jsx
import { Button } from 'flowbite-react';
import { useEffect, useState } from "react";
import { redirect, useOutletContext } from "react-router-dom";
import ToggleSwitch from '../components/ToggleSwitch';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RecipeCard from '../components/RecipeCard';
import CreateRecipeButton from '../components/CreateRecipeButton';


const server = import.meta.env.VITE_BACK_END_SERVE




const Dashboard = () => {

  const [userData, setUserData] = useOutletContext();
  const [isToggled, setIsToggled] = useState(true); // true for 'My Recipes', false for 'Favorites'
  const [favorites, setFavorites] = useState([])
  const [ userRecipes, setUserRecipes] = useState([])

  const fetchFavorites = async () => {
    const server = import.meta.env.VITE_BACK_END_SERVE
    try {
        
        const response = await fetch(`${server}/favorites/${userData.id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFavorites(data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};
const fetchMyRecipes = async () => {
  const server = import.meta.env.VITE_BACK_END_SERVE
  try {
      
      const response = await fetch(`${server}/recipes/created_by/${userData.id}`);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUserRecipes(data);
  } catch (error) {
      console.error('Error fetching recipes:', error);
  }
};
  useEffect(()=>{
      fetchFavorites()
      fetchMyRecipes()
  }, [])

  const toggle = () => {
    setIsToggled(!isToggled);
  };
  useEffect(() => {
    AOS.init({
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);
  const RecipeList = (recipes) => {
    return (
      <>
        {Array.from({ length: 20 }, (_, index) => (
          <RecipeCard key={index} />
        ))}
      </>
    );
  };
 
 console.log(userData)
 return (
  <>
  <div className='bg-bg7 h-full w-full' ></div>
  {/* <img src='/images/border-3.png' className='fixed top-0' style={{zIndex:"0"}}/>
   */}
    <div className=' flex justify-center items-center bg-bg7' >
      
      <div className='w-4/5 bg-beige dark:bg-brown'>
        
<div className=" flex items-center justify-center py-4 md:py-8 flex-wrap">
  <ToggleSwitch toggle={toggle} isToggled={isToggled}/>
  <div>
  <CreateRecipeButton/>
  </div>
</div>
<div className=" sm:ml-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
  {toggle ? (
    <RecipeList />
  ):(
    <RecipeList />
  )}
  
</div>
</div>
    </div>
    </>
  );
};

export default Dashboard;
