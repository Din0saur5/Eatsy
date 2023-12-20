/* eslint-disable react/prop-types */
import { Accordion } from 'flowbite-react';
import React, { useState } from 'react';

const CreateRecipeForm = ({userData}) => {
    console.log(userData)
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    steps: '',
    is_draft: false,
    tags: '',
    cuisine: '',
    meal_type: '',
    dish_type: '',
    time: '',
    user_id: userData.id, 
    ingredients: [{ text: '', food: '', quantity: '', unit: '' }]
  });

  const handleChange = (e) => {
    if (e.target.name.startsWith('ingredients')) {
      const index = parseInt(e.target.dataset.index);
      const newIngredients = formData.ingredients.map((ingredient, i) => {
        if (i === index) {
          return { ...ingredient, [e.target.dataset.field]: e.target.value };
        }
        return ingredient;
      });
      setFormData({ ...formData, ingredients: newIngredients });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const server = import.meta.env.VITE_BACK_END_SERVE
    try {
      const response = await fetch(`${server}/create_recipe`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Handle response
      console.log('Recipe created successfully');
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { text: '', food: '', quantity: '', unit: '' }]
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <textarea name="steps" value={formData.steps} onChange={handleChange} placeholder="Steps" />
      
      <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags" />
      <input type="text" name="cuisine" value={formData.cuisine} onChange={handleChange} placeholder="Cuisine" />
      <input type="text" name="meal_type" value={formData.meal_type} onChange={handleChange} placeholder="Meal Type" />
      <input type="text" name="dish_type" value={formData.dish_type} onChange={handleChange} placeholder="Dish Type" />
      <input type="text" name="time" value={formData.time} onChange={handleChange} placeholder="Time" />
      <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="User ID" />

      {/* Dynamic ingredient fields */}
      {formData.ingredients.map((ingredient, index) => (
        <div key={index}>
          <input type="text" name={`ingredients[${index}].text`} data-index={index} data-field="text" value={ingredient.text} onChange={handleChange} placeholder="Ingredient Text" />
          <input type="text" name={`ingredients[${index}].food`} data-index={index} data-field="food" value={ingredient.food} onChange={handleChange} placeholder="Food" />
          <input type="text" name={`ingredients[${index}].quantity`} data-index={index} data-field="quantity" value={ingredient.quantity} onChange={handleChange} placeholder="Quantity" />
          <input type="text" name={`ingredients[${index}].unit`} data-index={index} data-field="unit" value={ingredient.unit} onChange={handleChange} placeholder="Unit" />
        </div>
      ))}
      <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>

      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default CreateRecipeForm; 

<Accordion>
      <Accordion.Panel>
        <Accordion.Title>What is Flowbite?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
            dropdowns, modals, navbars, and more.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to&nbsp;
            <a
              href="https://flowbite.com/docs/getting-started/introduction/"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              get started&nbsp;
            </a>
            and start developing websites even faster with components on top of Tailwind CSS.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Is there a Figma file available?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
            has a design equivalent in our Figma file.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the
            <a href="https://flowbite.com/figma/" className="text-cyan-600 hover:underline dark:text-cyan-500">
              Figma design system
            </a>
            based on the utility classes from Tailwind CSS and components from Flowbite.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>What are the differences between Flowbite and Tailwind UI?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            The main difference is that the core components from Flowbite are open source under the MIT license, whereas
            Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
            components, whereas Tailwind UI offers sections of pages.
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
            technical reason stopping you from using the best of two worlds.
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
          <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
            <li>
              <a href="https://flowbite.com/pro/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                Flowbite Pro
              </a>
            </li>
            <li>
              <a
                href="https://tailwindui.com/"
                rel="nofollow"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Tailwind UI
              </a>
            </li>
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>