import React, { useState } from 'react';

const cuisineTypes = [
  "american", "asian", "british", "caribbean", "central europe", "chinese", "eastern europe", 
  "french", "greek", "indian", "italian", "japanese", "korean", "kosher", "mediterranean", 
  "mexican", "middle eastern", "nordic", "south american", "south east asian", "world"
];

const AutocompleteInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = cuisineTypes.filter(type => 
      type.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <>
      <input
        type="text" 
        value={inputValue}
        onChange={handleChange}
        placeholder="Cuisine Type"
        className="border border-gray-400 rounded-lg mr-1 p-2"
      />
      {suggestions.length > 0 && (
        <ul className="absolute border border-gray-400 bg-white w-full rounded mt-0 p-0">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AutocompleteInput;
