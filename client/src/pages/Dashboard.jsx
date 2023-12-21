// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import ToggleSwitch from '../components/ToggleSwitch';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RecipeCard from '../components/RecipeCard';
import CreateRecipeButton from '../components/CreateRecipeButton';
import CreateRecipe from '../components/CreateRecipe';
import Button from 'flowbite-react';

const Dashboard = () => {
  const [userData, setUserData] = useOutletContext();
  const [isToggled, setIsToggled] = useState(true); // true for 'My Recipes', false for 'Favorites'
  const [favorites, setFavorites] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadMoreCount, setLoadMoreCount] = useState(6);
  const [hasMoreRecipes, setHasMoreRecipes] = useState(true);

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

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  const RecipeList = ({ list }) => {
    return (
      <>
        {list.map((recipe, index) => {
          return <RecipeCard recipe={recipe} key={index} />
        })}
      </>
    );
  };

  const loadMore = () => {
    const newRecipesToLoad = 6;
    const currentOffset = userRecipes.length;
    setLoadMoreCount(prevCount => prevCount + newRecipesToLoad);
    fetchMyRecipes(newRecipesToLoad, currentOffset);
  };

  return (
    <>
      <div className=' flex justify-center items-center bg-bg7'>
        <div className='w-4/5 bg-beige dark:bg-brown'>
          <div className='m-3'>
            <CreateRecipeButton setIsModalOpen={setIsModalOpen} />
          </div>
          <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
            <ToggleSwitch toggle={toggle} isToggled={isToggled} />
          </div>
          <div className="sm:ml-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {isToggled ? (
              <RecipeList list={userRecipes} />
            ) : (
              <RecipeList list={favorites} />
            )}
          </div>
          {isToggled && hasMoreRecipes && (
            <div className="text-center mt-4">
              <Button onClick={loadMore}>Load More Recipes</Button>
            </div>
          )}
        </div>
      </div>
      <CreateRecipe userData={userData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Dashboard;
