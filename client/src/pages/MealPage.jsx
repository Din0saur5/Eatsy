import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MealPage = () => {
  const [totalRecipes, setTotalRecipes] = useState(0);
  const { mealType } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loadMoreCount, setLoadMoreCount] = useState(10);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedMealType = capitalizeFirstLetter(mealType);

  const fetchRecipes = async (limit, offset) => {
    const server = import.meta.env.VITE_BACK_END_SERVE; // Your server URL from environment variables
    let queryMealType = mealType; // Meal type from the URL parameters
  
    // Handling specific cases, like combining 'lunch' and 'dinner'
    if (mealType === 'lunch' || mealType === 'dinner') {
      queryMealType = 'lunch%2Fdinner';
    }
  
    try {
      // Making the fetch request with the limit and offset parameters
      const response = await fetch(`${server}/recipes/meal_type/${queryMealType}?limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        // If the response is not okay, throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parsing the JSON response
      const data = await response.json();
  
      // Updating the state to include the newly fetched recipes
      setRecipes(prevRecipes => [...prevRecipes, ...data]);
  
      // Optionally, if your API returns the total number of recipes available,
      // you can update the totalRecipes state here (if implemented):
      // setTotalRecipes(data.totalRecipesCount);
    } catch (error) {
      // Log any errors that occur during the fetch
      console.error('Error fetching recipes:', error);
    }
  };
  
  
  useEffect(() => {
    // Load initial recipes
    fetchRecipes(loadMoreCount, 0);
  }, [mealType]);
  
  const loadMore = () => {
    const newRecipesToLoad = 20;
    const currentOffset = recipes.length;
    setLoadMoreCount(prevCount => prevCount + newRecipesToLoad);
    fetchRecipes(newRecipesToLoad, currentOffset);
  };
  

  return (
    <div>
      <Navbar />
      <div className='bg-background5 bg-cover p-4'>
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Recipes</h2>
          <h1 className="text-3xl font-bold">{capitalizedMealType} Recipes</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          {recipes.map((recipe, index) => (
            <div key={index} className="m-2 p-4 border rounded-lg shadow-md bg-white max-w-sm">
              <h3 className="text-xl font-semibold">{recipe.name}</h3>
              <img src={recipe.image} alt={recipe.name} className="max-w-full max-h-52 mt-2 rounded" />
            </div>
          ))}
        </div>
        {recipes.length < totalRecipes && (
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
