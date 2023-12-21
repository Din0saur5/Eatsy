import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const IngredientPage = () => {
    const { ingredient } = useParams(); // Use ingredient from the URL
    const [recipes, setRecipes] = useState([]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const capitalizedIngredient = capitalizeFirstLetter(ingredient); // Capitalize the ingredient

    const fetchRecipes = async () => {
        const server = import.meta.env.VITE_BACK_END_SERVE
        try {
            const response = await fetch(`${server}/recipes/ingredient/${ingredient}`); // Use ingredient in the fetch URL
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
    }, [ingredient]); // Dependency on ingredient

    return (
        <div className='bg-background5 bg-cover p-4'>
          <div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Recipes</h2>
              <h1 className="text-3xl font-bold">{capitalizedIngredient} Recipes</h1>
            </div>
            <div className="flex flex-wrap justify-center items-center">
              {recipes.map((recipe, index) => (
                <div key={index} className="m-2 p-4 border rounded-lg shadow-md bg-white max-w-sm">
                  <h3 className="text-xl font-semibold">{recipe.name}</h3>
                  <p className="text-gray-600">{recipe.description}</p>
                  <img src={recipe.image} alt={recipe.name} className="max-w-full max-h-52 mt-2 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
    );
};

export default IngredientPage;
