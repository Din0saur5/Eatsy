import React, { useEffect, useState, useCallback } from 'react';
import { useOutletContext } from "react-router-dom";
import ToggleSwitch from '../components/ToggleSwitch';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RecipeCard from '../components/RecipeCard';
import CreateRecipeButton from '../components/CreateRecipeButton';
import CreateRecipe from '../components/CreateRecipe';

const Dashboard = () => {
  const [userData, setUserData] = useOutletContext();
  const [isToggled, setIsToggled] = useState(true); // true for 'My Recipes', false for 'Favorites'
  const [favorites, setFavorites] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadMoreCount, setLoadMoreCount] = useState(6);
  const [hasMoreRecipes, setHasMoreRecipes] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const fetchFavorites = async () => {
    const server = import.meta.env.VITE_BACK_END_SERVE;
    try {
      const response = await fetch(`${server}/favorites/${userData.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const fetchMyRecipes = async (limit = 6, offset = 0) => {
    const server = import.meta.env.VITE_BACK_END_SERVER;
    try {
      const url = `${server}/recipes/created_by/${userData.id}?limit=${limit}&offset=${offset}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length < limit) {
        setHasMoreRecipes(false);
      }
      setUserRecipes(prevRecipes => [...prevRecipes, ...data]);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
    fetchMyRecipes();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  const loadMoreOnScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && window.innerHeight + window.scrollY >= document.documentElement.offsetHeight && hasMoreRecipes && !isToggled) {
      const newRecipesToLoad = 6;
      const currentOffset = userRecipes.length;
      setLoadMoreCount(prevCount => prevCount + newRecipesToLoad);
      fetchMyRecipes(newRecipesToLoad, currentOffset);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY, hasMoreRecipes, userRecipes.length, isToggled]);

  useEffect(() => {
    window.addEventListener('scroll', loadMoreOnScroll);
    return () => window.removeEventListener('scroll', loadMoreOnScroll);
  }, [loadMoreOnScroll]);

  const RecipeList = ({ list }) => {
    return (
      <>
        {list.map((recipe, index) => {
          return <RecipeCard recipe={recipe} key={index} />
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
            {isToggled ? (
              <RecipeList list={favorites} />
            ) : (
              <RecipeList list={userRecipes} />
            )}
          </div>
          {/* Removed the 'Load More' button since infinite scroll is implemented */}
        </div>
      </div>
      <CreateRecipe userData={userData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Dashboard;
