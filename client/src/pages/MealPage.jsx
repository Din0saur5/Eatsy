import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard'; 

const MealPage = () => {
  const { mealType } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loadMoreCount, setLoadMoreCount] = useState(1);
  const [hasMoreRecipes, setHasMoreRecipes] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedMealType = capitalizeFirstLetter(mealType);

  const fetchRecipes = async (limit, offset) => {
    const server = import.meta.env.VITE_BACK_END_SERVE;
    let queryMealType = mealType;

    if (mealType === 'lunch' || mealType === 'dinner') {
      queryMealType = 'lunch%2Fdinner';
    }

    try {
      const response = await fetch(`${server}/recipes/meal_type/${queryMealType}?limit=${limit}&offset=${offset}`);
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
  }, [mealType]);

  const loadMore = () => {
    const newRecipesToLoad = 2;
    const currentOffset = recipes.length;
    setLoadMoreCount(prevCount => prevCount + newRecipesToLoad);
    fetchRecipes(newRecipesToLoad, currentOffset);
  };

  return (
    <div className='bg-background5 bg-cover p-4'>
      <Navbar />
      <div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Recipes</h2>
          <h1 className="text-3xl font-bold">{capitalizedMealType} Recipes</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} /> // Use RecipeCard here
          ))}
        </div>
        {hasMoreRecipes && (
          <div className="text-center mt-4">
            <button onClick={loadMore} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Load More Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPage;