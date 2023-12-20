import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MealPage = () => {
  const { mealType } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [loadMoreCount, setLoadMoreCount] = useState(10);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const capitalizedMealType = capitalizeFirstLetter(mealType);

    const fetchRecipes = async () => {
      const server = import.meta.env.VITE_BACK_END_SERVE;
      let queryMealType = mealType;
      if (mealType === 'lunch' || mealType === 'dinner') {
          queryMealType = 'lunch%2Fdinner';  // Replaces 'lunch' or 'dinner' with 'lunch/dinner'
      }
  
      try {
          const response = await fetch(`${server}/recipes/meal_type/${queryMealType}`);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setRecipes(data);
      } catch (error) {
          console.error('Error fetching recipes:', error);
      }
  };
  
  useEffect(() => {
      fetchRecipes();
  }, [mealType]);

  useEffect(() => {
    setDisplayedRecipes(recipes.slice(0, loadMoreCount));
}, [recipes, loadMoreCount]);

const loadMore = () => {
    setLoadMoreCount(prevCount => prevCount + 20);
};
return (
  <div>
    <Navbar/>
    <div className='bg-background5 bg-cover p-4'>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Recipes</h2>
        <h1 className="text-3xl font-bold">{capitalizedMealType} Recipes</h1>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {displayedRecipes.map((recipe, index) => (
          <div key={index} className="m-2 p-4 border rounded-lg shadow-md bg-white max-w-sm">
            <h3 className="text-xl font-semibold">{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} className="max-w-full max-h-52 mt-2 rounded" />
          </div>
        ))}
      </div>
      {loadMoreCount < recipes.length && (
        <div className="text-center mt-4">
          <button onClick={loadMore} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Load More Recipes
          </button>
        </div>
      )}
    </div>
  </div>
);
}
export default MealPage;
