// Dashboard.jsx
import { Button } from 'flowbite-react';
import { useEffect, useState } from "react";
import { redirect, useOutletContext } from "react-router-dom";
import ToggleSwitch from '../components/ToggleSwitch';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RecipeCard from '../components/RecipeCard';
import CreateRecipeButton from '../components/CreateRecipeButton';
import CreateRecipe from '../components/CreateRecipe';


const server = import.meta.env.VITE_BACK_END_SERVE




const Dashboard = () => {

  const [userData, setUserData] = useOutletContext();
  const [isToggled, setIsToggled] = useState(true); // true for 'My Recipes', false for 'Favorites'
  const [favorites, setFavorites] = useState([])
  const [ userRecipes, setUserRecipes] = useState([])
const [isModalOpen, setIsModalOpen] = useState(false);
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
      console.log(userRecipes)
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
  const RecipeList = ({list}) => {
    return (
      <>
        {list.map((recipe, index)=>{
         return <RecipeCard recipe={recipe} key={index} />

        })}
       
      </>
    );
  };
 
 console.log(userData)
 return (
  <>

    <div className=' flex justify-center items-center bg-bg7' >
      
      <div className='w-4/5 bg-beige dark:bg-brown'>
        
  <div className='m-3'>
  <CreateRecipeButton setIsModalOpen={setIsModalOpen}/>
  </div>
<div className=" flex items-center justify-center py-4 md:py-8 flex-wrap">
  <ToggleSwitch toggle={toggle} isToggled={isToggled}/>
</div>
<div className=" sm:ml-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
  {toggle ? (
    <RecipeList list={userRecipes}/>
  ):(
    <RecipeList list={[]}/>
  )}
  
</div>
</div>
    </div>
    <CreateRecipe userData={userData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </>
  );
};

export default Dashboard;
