import React from 'react';
import { useParams } from 'react-router-dom';

const MealPage = () => {
    const { mealType } = useParams();

return (
    <div>
      <h1>{mealType}</h1>
      {/* Render content based on mealType */}
    </div>
  );
};
export default MealPage;