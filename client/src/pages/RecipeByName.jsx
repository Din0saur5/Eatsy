import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './RecipeByName.css';

const RecipeSearchPage = () => {
  const [organizedRecipes, setOrganizedRecipes] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
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
        console.error('Error fetching recipes:', error);
      });
  }, [server]);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearchChange = (event) => {
    const newSearchQuery = event.target.value.toLowerCase();
    setSearchQuery(newSearchQuery);
    setSearchParams({ search: newSearchQuery });
  };

  const filteredRecipes = Object.entries(organizedRecipes).reduce((acc, [letter, recipes]) => {
    const filtered = searchQuery === ''
      ? recipes
      : recipes.filter(recipe => recipe.name.toLowerCase().includes(searchQuery));

    if (filtered.length) {
      acc[letter] = filtered;
    }
    return acc;
  }, {});

  const hasRecipes = Object.keys(filteredRecipes).length > 0;
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

      {!hasRecipes && (
        <div className="no-results">
          <p>No Results Found for "{searchQuery}"</p>
        </div>
      )}

      {hasRecipes &&Object.keys(filteredRecipes)
        .sort()
        .map((letter) => (
          <div key={letter} id={letter} className="letter-section">
            <h2>{letter}</h2>
            <ul className="recipe-list md:columns-3 list-disc">
              {filteredRecipes[letter].map((recipe) => (
                <li className='mb-3  ml-4' key={recipe.id}>
                  <Link to={`/recipe/${recipe.id}`} className="recipe-link ">
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
