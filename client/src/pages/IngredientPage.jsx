import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

const IngredientPage = () => {
  const { ingredient } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loadMoreCount, setLoadMoreCount] = useState(9);
  const [hasMoreRecipes, setHasMoreRecipes] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedIngredient = capitalizeFirstLetter(ingredient);

  const fetchRecipes = async (limit, offset) => {
    const server = import.meta.env.VITE_BACK_END_SERVE;
    try {
      const response = await fetch(`${server}/recipes/ingredient/${ingredient}?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(prevRecipes => [...prevRecipes, ...data]);

      if (data.length < limit) {
        setHasMoreRecipes(false);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes(loadMoreCount, 0);
  }, [ingredient]);

  const loadMoreOnScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && window.innerHeight + window.scrollY >= document.body.offsetHeight && hasMoreRecipes) {
      const newRecipesToLoad = 6;
      const currentOffset = recipes.length;
      setLoadMoreCount(prevCount => prevCount + newRecipesToLoad);
      fetchRecipes(newRecipesToLoad, currentOffset);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY, hasMoreRecipes, recipes.length]);

  useEffect(() => {
    window.addEventListener('scroll', loadMoreOnScroll);
    return () => window.removeEventListener('scroll', loadMoreOnScroll);
  }, [loadMoreOnScroll]);

  return (
    <div className='flex justify-center items-center bg-background5 '>
      <div className='w-4/5'>
        <div className="m-3">
          <div  className='flex items-center justify-center py-4 md:py-8 flex-wrap'>
          <h2 className="text-2xl font-semibold">Recipes:&emsp;</h2>
          <h1 className="text-3xl font-bold">{capitalizedIngredient} Recipes</h1>
        </div>
        </div>
        <div className="sm:ml-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientPage;
