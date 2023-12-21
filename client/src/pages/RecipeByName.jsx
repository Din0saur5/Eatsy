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
            <ul className="recipe-list md:columns-3 list-disc">
              {organizedRecipes[letter].map((recipe) => (
              <li className='mb-3  ml-4' key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`}  className="recipe-link ">
                  {recipe.name}
                </Link>
                </li>
              ))}
            </ul>
          </div>
      ))}
    </div>
);

}
export default RecipeSearchPage;