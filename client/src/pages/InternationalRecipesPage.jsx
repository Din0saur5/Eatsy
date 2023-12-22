import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InternationalRecipesPage.css';

const InternationalRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const server = import.meta.env.VITE_BACK_END_SERVE;

  const cuisines = [
    "american", "asian", "british", "caribbean", "central europe", "chinese", 
    "eastern europe", "french", "greek", "indian", "italian", "japanese", 
    "korean", "kosher", "mediterranean", "mexican", "middle eastern", 
    "nordic", "south american", "south east asian", "world"
  ];

  const fetchRecipes = async () => {
      const response = await fetch(`${server}/recipes/cuisine/${selectedCuisine}?limit=20`);
      const data = await response.json();
      setRecipes(data);
  };

  if(selectedCuisine !== "") {
    fetchRecipes();
  }

  const handleCuisineChange = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='bg-background4 bg-cover min-h-screen pt-2 bg-fixed'>
      <div className="container bg-[#F5E8D6] bg-opacity-60 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.6)]">
        <h1>International Recipes</h1>
        <input
          type="search"
          placeholder="Search by Recipe Name"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="cuisine-nav">
          {cuisines.map(cuisine => (
            <button 
              key={cuisine} 
              onClick={() => handleCuisineChange(cuisine)}
              className={selectedCuisine === cuisine ? 'selected' : ''}
            >
              {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
            </button>
          ))}
        </div>
        <div className="recipe-list">
          {filteredRecipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-link">
              {recipe.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternationalRecipesPage;
