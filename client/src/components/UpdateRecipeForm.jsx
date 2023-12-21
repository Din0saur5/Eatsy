/* eslint-disable react/prop-types */
import { Accordion, Button, Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import AutocompleteInput from './AutoComplete';

const UpdateRecipeForm = ({userData,  selectedRecipe, userRecipes, setUserRecipes, handleClose}) => {

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    steps: [],
    is_draft: false,
    tags: [''],
    meal_type: '',
    time: '',
    user_id: userData.id, 
    ingredients: [{ text: '', food: '', quantity: '', unit: '' , id: ''}]
  });

  const [cuisineType, setCuisineType]=useState('')
  const [dishType, setDishType]=useState('')
  const [isFormValid, setIsFormValid] = useState(false); 

console.log(formData)
  const cuisineTypes = [
    "american", "asian", "british", "caribbean", "central europe", "chinese", "eastern europe", 
    "french", "greek", "indian", "italian", "japanese", "korean", "kosher", "mediterranean", 
    "mexican", "middle eastern", "nordic", "south american", "south east asian", "world"
  ];

  const dishTypes = ["soup",  "starter",  "desserts",  "main course",  "drinks",  "condiments and sauces",
  "bread",  "salad",  "biscuits and cookies",  "sandwiches",  "cereals"]
  useEffect(() => {
    // Check if selectedRecipe and its properties are defined
    if (selectedRecipe) {
      setFormData({
        name: selectedRecipe.name || '',
        image: selectedRecipe.image || '',
        description: selectedRecipe.description || '',
        steps: selectedRecipe.steps || [],
        is_draft: selectedRecipe.is_draft || false,
        tags: selectedRecipe.tags?.join('#') || '',
        meal_type: selectedRecipe.meal_type || '',
        time: selectedRecipe.time || '',
         user_id: userData.id,
        ingredients: selectedRecipe.ingredients || [{ text: '', food: '', quantity: '', unit: '', id: '' }]
      });
      setCuisineType(selectedRecipe.cuisine || '');
      setDishType(selectedRecipe.dish_type || '');
      
    }
  }, []);

 

  const fetchRecipe = async () => {
    const server = import.meta.env.VITE_BACK_END_SERVE; 
    try{
      const response = await fetch(`${server}/recipes/${selectedRecipe.id}`, {
        credentials:'include',
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const recipeData = await response.json()
      console.log(recipeData)
      setFormData(recipeData)
    }catch(err){
        console.error('Error creating recipe:', err);
    }
  }
  useEffect(() => {
    fetchRecipe()
  },[])


  useEffect(() => {
    // Update isFormValid based on formData
    const isFormDataValid = formData.name && formData.image && formData.description 
                            && formData.steps.every(step => step.trim() !== '') 
                            && formData.tags;
    setIsFormValid(isFormDataValid);
  }, [formData]);

  const handleChange = (e) => {
    


    if (e.target.name.startsWith('ingredients')) {
      const index = parseInt(e.target.dataset.index);
      const newIngredients = formData.ingredients && formData.ingredients.map((ingredient, i) => {
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
    console.log(formData.tags)
    

  // Create the final form data object for submission
    const finalFormData = {
    name: formData.name,
    image: formData.image,
    description: formData.description,
    steps: formData.steps,
    meal_type: formData.meal_type,
    time: formData.time,
    user_id: userData.id, 
    tags:formData.tags,
    cuisine: cuisineType,
    dish_type: dishType,
    ingredients: formData.ingredients,
  };
  console.log(finalFormData);
    const server = import.meta.env.VITE_BACK_END_SERVE
    try {
      const response = await fetch(`${server}/recipes/change/${selectedRecipe.id}`, {
        credentials: 'include',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: finalFormData.name,
          image: finalFormData.image,
          description: finalFormData.description,
          steps: finalFormData.steps,
          meal_type: finalFormData.meal_type,
          time: finalFormData.time,
          user_id: finalFormData.user_id,
          tags:finalFormData.tags,
          cuisine: finalFormData.cuisine,
          dish_type: finalFormData.dish_type,
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json()
      
      
      const newRecipes = userData.recipes.map(recipe => recipe.id === data.id ? data : recipe);
      
      const storedUserStr= sessionStorage.getItem('token')
      if (storedUserStr){
        let storedUser = JSON.parse(storedUserStr)
        storedUser.recipes = newRecipes
        sessionStorage.setItem('token', JSON.stringify(storedUser))}
        setUserRecipes(newRecipes)
      } catch (error) {
        console.error('Error updating recipe:', error);
        
      }
      for(const ingredient in selectedRecipe.ingredients ) { 
       if(!(ingredient in finalFormData.ingredients) ){
        try {
          const response = await fetch(`${server}/ingredients/${ingredient.id}`, {
              method: 'DELETE',
              credentials: 'include', // include if needed for credentials like cookies/session
              headers: {
                  'Content-Type': 'application/json'
                  // Include additional headers as required by your server
              }
          });
  
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`); 
          }
              const data = await response.json()
              console.log(data);
             
          
          } catch (error) {
          console.error('Er ')
       }}
        if (ingredient.id && ingredient in finalFormData.ingredients){
        try{
        const resp = await fetch(`${server}/ingredients/${ingredient.id}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            text: ingredient.text,
            food: ingredient.food,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            
            })
          })
          if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
          }
          const d = await resp.json()
          console.log(d)
        } catch (error) {
          console.error('Error updating recipe:', error);
          handleClose();
          alert('Error updating recipe')
        }
      }else{
        try {
          const resp = await fetch(`${server}/ingredients`,{
             credentials: 'include',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              text: ingredient.text,
              food: ingredient.food,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
              recipe_id: ingredient.recipe_id,
              })
          });
          if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
          }
          const d = await resp.json()
          console.log(d)
        } catch (error) {
          console.error('Error creating recipe:', error);
        }


      }
    }
      handleClose()
      alert('Recipe updated successfully')
      setFormData({
        name: '',
        image: '',
        description: '',
        steps: [''],
        is_draft: false,
        tags: [''],
        meal_type: '',
        time: '',
        user_id: userData.id, 
        ingredients: [{ text: '', food: '', quantity: '', unit: '' }]
      })
      
   

   

  };


  const deleteRecipe = async (recipeId) => {
    const server = import.meta.env.VITE_BACK_END_SERVE; // Ensure this is the correct environment variable for your server URL

    try {
        const response = await fetch(`${server}/recipes/change/${recipeId}`, {
            method: 'DELETE',
            credentials: 'include', // include if needed for credentials like cookies/session
            headers: {
                'Content-Type': 'application/json'
                // Include additional headers as required by your server
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); 
        }
            const data = await response.json()
            console.log('Recipe deleted successfully');
            setUserRecipes(userRecipes.filter((r)=> r!== response))
            handleClose()
            alert('Recipe deleted successfully')
            setFormData({
                name: '',
                image: '',
                description: '',
                steps: [''],
                is_draft: false,
                tags: [''],
                meal_type: '',
                time: '',
                user_id: userData.id, 
        })
        } catch (error) {
        console.error('Error deleting recipe:', error);
        handleClose()        
        .then(alert('Error deleting recipe'))
        }
};

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { text: '', food: '', quantity: '', unit: '' }]
    });
  };

  const handleDeleteIngredient = (index) => {
    
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleChangeStep = (index, value) => {
    const newSteps = formData.steps && formData.steps.map((step, i) => (
      i === index ? value : step
    ));
    setFormData({ ...formData, steps: newSteps });
  };

  const handleAddStep = () => {
    setFormData({ ...formData, steps: [...formData.steps, ''] });
  };
  
  const handleDeleteStep = (index) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    setFormData({ ...formData, steps: newSteps });
  };


  return (
    <form className="h-96 overflow-y-auto" onSubmit={handleSubmit}>
        <Accordion>
            <Accordion.Panel>
                <Accordion.Title>Basic Info?</Accordion.Title>
                <Accordion.Content>
                <input className='rounded-lg mb-2 mr-1' type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name"  required/>
                <input className='rounded-lg mb-2 mr-1' type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL"  required/>
                <input className='rounded-lg mb-2 mr-1' type="number" name="time" value={formData.time} onChange={handleChange} placeholder="Est. Cook Time" required />
                <AutocompleteInput  dataSet={dishTypes}  valueOf={dishType} placeholder={"Dish Type"} action={setDishType} />
                <AutocompleteInput dataSet={cuisineTypes}  valueOf={cuisineType} action={setCuisineType} placeholder={"Cuisine"} required />
                <div className="max-w-md">
                <div className="mb-2 block">
                    </div>
                <Select name="meal_type" value={formData.meal_type} onChange={handleChange}  required> 
                    <option className='text-white hover:text-blue-400'>Meal Type</option>
                    <option>Breakfast</option>
                    <option>Lunch/Dinner</option>
                    <option>Teatime</option>
                    <option>Snack</option>
                </Select>
                </div>            
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>Description and Tags?</Accordion.Title>
                <Accordion.Content>
                    <div className='flex flex-col'>
                <textarea className='rounded-lg mb-2 mr-1' name="description" value={formData.description} onChange={handleChange} placeholder="Description"  required/>
                <label className='text-gray-500' htmlFor='tags'>add tags for better searchability (format: #veggie_soup) </label>
                <input className='rounded-lg mb-2 mr-1' type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags"  required />
                </div>
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>Ingredients?</Accordion.Title>
                <Accordion.Content>
                
                {formData.ingredients.map((ingredient, index) => (
                <div key={index}>
                    <label>Ingredient {index+1}</label>
                {formData.ingredients.length > 1 && (
                    <button 
                    type="button" 
                              onClick={() => handleDeleteIngredient(index)}
                              className=" ml-72 bg-red-500 text-white ml-1 px-1.5 rounded hover:bg-red-600"
                            >
                              X
                            </button>
                          )}
                          <br></br>
                <input className='rounded-lg my-2 mr-1' type="text" name={`ingredients[${index}].text`} data-index={index} data-field="text" value={ingredient.text} onChange={handleChange} placeholder="Extra Details" />
                <input className='rounded-lg mb-2 mr-1' type="text" name={`ingredients[${index}].food`} data-index={index} data-field="food" value={ingredient.food} onChange={handleChange} placeholder="Food"  required/>
                <input className='rounded-lg mb-2 mr-1' type="number" name={`ingredients[${index}].quantity`} data-index={index} data-field="quantity" value={ingredient.quantity} onChange={handleChange} placeholder="Quantity"  required/>
                <input className='rounded-lg mb-2 mr-1' type="text" name={`ingredients[${index}].unit`} data-index={index} data-field="unit" value={ingredient.unit} onChange={handleChange} placeholder="Unit"  required/>
                </div>
            ))}
            <button className='border bg-blue-400  px-2 p-0.5 rounded-lg mb-2 mr-1' type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>Steps?</Accordion.Title>
                <Accordion.Content >
                {formData.steps.map((step, index) => (
                        <div key={index}>
                        <input 
                            type="text" 
                            value={step} 
                            onChange={(e) => handleChangeStep(index, e.target.value)} 
                            placeholder={`Step ${index + 1}`} 
                            className="border border-gray-400 rounded p-2 my-1"
                            required
                        />
                        {formData.steps.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => handleDeleteStep(index)}
                              className="bg-red-500 text-white ml-1 px-1.5 rounded hover:bg-red-600"
                            >
                              X
                            </button>
                          )}
                        </div>
                    ))}
                   
                    <button  className='border  bg-blue-400  px-2 p-0.5 rounded-lg mb-2 mr-1' type="button" onClick={handleAddStep}>Add Step</button>
                </Accordion.Content>
            </Accordion.Panel>
            </Accordion>

        <div className='flex flex-row justify-between'> 
            <Button  disabled={!isFormValid} gradientMonochrome="success"  className={`mt-4 px-4 py-2 ${isFormValid ? '': 'bg-gray-500 text-gray-200'}` } type="submit">Update Recipe</Button>
            <Button gradientMonochrome="failure" onClick={()=>deleteRecipe(selectedRecipe.id)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete Recipe</Button>
            <Button gradientMonochrome="failure" onClick={handleClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</Button>

        </div>
    </form>
    
  );
};

export default UpdateRecipeForm; 
