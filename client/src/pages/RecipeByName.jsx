import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RecipeByName.css';

const RecipeSearchPage = () => {
  const [organizedRecipes, setOrganizedRecipes] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const server = import.meta.env.VITE_BACK_END_SERVE;

  useEffect(() => {
    fetch(`${server}/recipes/names`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setOrganizedRecipes(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, [server]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredRecipes = Object.entries(organizedRecipes).reduce((acc, [letter, recipes]) => {
    const filtered = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchQuery));
    if (filtered.length) {
      acc[letter] = filtered;
    }
    return acc;
  }, {});

  return (
    <div className="container">
      <h1>Recipes A-Z</h1>
      <input
        type="search"
        placeholder="Search"
        className="search-bar"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="alphabet-nav">
        <h2>Find a Recipe By its first letter</h2>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <a href={`#${letter}`} key={letter}>{letter}</a>
        ))}
      </div>

      {Object.keys(filteredRecipes)
        .sort()
        .map((letter) => (
          <div key={letter} id={letter} className="letter-section">
            <h2>{letter}</h2>
            <div className="recipe-list">
              {filteredRecipes[letter].map((recipe) => (
                <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-link">
                  {recipe.name}
                </Link>
              ))}
            </div>
          </div>
      ))}
    </div>
  );
}

export default RecipeSearchPage;
