import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MealPage = () => {
    const { mealType } = useParams();
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const capitalizedMealType = capitalizeFirstLetter(mealType);

    return (
        <div>
          <Navbar/>
          <div className='bg-background5 bg-cover'>
            <div>
              <h2>Recipes</h2>
              <h1>{capitalizedMealType} Recipes</h1>
            </div>
            <div className="flex justify-center items-center h-screen">
            </div>
          </div>
        </div>
    );
};

export default MealPage;
