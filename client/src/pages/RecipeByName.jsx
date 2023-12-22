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
        <h2>Click a Letter to Jump to the Category</h2>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <a href={`#${letter}`} key={letter}>{letter}</a>
        ))}
      </div>

      {Object.keys(filteredRecipes)
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
