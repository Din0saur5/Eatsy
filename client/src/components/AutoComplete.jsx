import React, { useState } from 'react';
import { useActionData } from 'react-router-dom';


const AutocompleteInput = ({dataSet, placeholder, action, valueOf}) => {
  
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
   
    action(value)
    console.log(valueOf)
    if (!value) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = dataSet.filter(type => 
      type.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    action(suggestion)
    setSuggestions([]);

  };

  return (
    <>
      <input
        type="text" 
        value={valueOf}
        onChange={handleChange}
        placeholder={placeholder}
        className="border border-gray-400 rounded-lg mr-1 p-2"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-50 border border-gray-400 bg-white w-full rounded mt-0 p-0">
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
