import React, { useEffect, useState } from 'react';
import './RecipeByName.css'; 
import { Link } from 'react-router-dom'

const RecipeSearchPage = () => {
  const [organizedRecipes, setOrganizedRecipes] = useState({});
  const server = import.meta.env.VITE_BACK_END_SERVE;

  useEffect(() => {
    // Fetch the recipe names organized by their first letter
    fetch(`${server}/recipes/names`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setOrganizedRecipes(data); // Set the organized recipe names in state
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, [server]); // Dependency array with server URL to trigger the effect when the URL changes

  return (
    <div className="container">
      <h1>Recipes A-Z</h1>
      <input type="search" placeholder="Search" className="search-bar" />
      <div className="alphabet-nav">
        <h2>Find a Recipe By its first letter</h2>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <a href={`#${letter}`} key={letter}>{letter}</a>
        ))}
      </div>
  
      {Object.keys(organizedRecipes)
        .sort()
        .map((letter) => (
          <div key={letter} id={letter} className="letter-section">
            <h2>{letter}</h2>
            <div className="recipe-list">
              {organizedRecipes[letter].map((recipe) => (
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