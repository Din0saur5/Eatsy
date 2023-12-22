import React, { useState } from 'react';
 // Adjust the path as per your project structure
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Accordion, Button, Select } from 'flowbite-react';
import AutocompleteInput from '../components/AutoComplete';


const CreateNewRecipe = () => {
    const [userData, setUserData] = useOutletContext();
    const [formData, setFormData] = useState({
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
      });
    const [cuisineType, setCuisineType]=useState('')
    const [dishType, setDishType]=useState('')
 
    const navigate = useNavigate();
    


    const cuisineTypes = [
        "american", "asian", "british", "caribbean", "central europe", "chinese", "eastern europe", 
        "french", "greek", "indian", "italian", "japanese", "korean", "kosher", "mediterranean", 
        "mexican", "middle eastern", "nordic", "south american", "south east asian", "world"
      ];
    
    const dishTypes = ["soup",  "starter",  "desserts",  "main course",  "drinks",  "condiments and sauces",
      "bread",  "salad",  "biscuits and cookies",  "sandwiches",  "cereals"]
    



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
        const newSteps = formData.steps.map((step, i) => (
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


      const handleChange = (e) => {
    
        if (e.target.name.startsWith('ingredients')) {
          const index = parseInt(e.target.dataset.index);
          console.log(index)
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
        console.log(formData)
      };



      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called");
    
        // Process tags
        const processedTags = formData.tags
            .split('#')
            .filter(tag => tag.trim() !== '') 
            .map(tag => tag.trim().replace(/_/g, ' ').replace(/,/g, '')); 
    
        // Create the final form data object for submission
        const finalFormData = {
            ...formData,
            tags: processedTags,
            cuisine: cuisineType,
            dish_type: dishType,
            user_id: userData.id, // Ensure user_id is correctly assigned
            steps: formData.steps.filter(step => step.trim() !== '') // Filter out any empty step
        };
    
        console.log(finalFormData);
        const server = import.meta.env.VITE_BACK_END_SERVE;
    
        try {
            const response = await fetch(`${server}/recipes/create`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalFormData) // Send the final form data
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const recipeData = await response.json();
            console.log('Recipe created successfully', recipeData);
    
            // Optionally navigate to a different page or reset form here
            // navigate('/some-path');
            // setFormData({ /* initial form state */ });
    
        } catch (error) {
            console.error('Error creating recipe:', error);
            alert('Error creating recipe');
        }   
    };

    // Ensure userData is available here and is the correct object
    return (
        <div  className='flex h-full overflow-y-auto min-h-screen justify-center items-center bg-bg7 '>
        <div  className='w-4/5 h-full min-h-screen bg-beige dark:bg-brown'>
         
          <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <form className="w-screen" onSubmit={handleSubmit}>
        <Accordion>
            <Accordion.Panel>
                <Accordion.Title className='' >Basic Info?</Accordion.Title>
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
                    <option>Brunch</option>
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
                <div key={`ingredient-${index}`}> {/* Add key prop */}
                <div className='sm:' key={index}>
                   
                    
                    <h4 className='text-left underline'>Ingredient {index+1}:</h4>
                    <div></div>
                    <input className='rounded-lg ml-5 my-2 mr-1' type="text" name={`ingredients[${index}].text`} data-index={index} data-field="text" value={ingredient.text} onChange={handleChange} placeholder="Extra Details" required />
                    <div></div>
                    <input className='rounded-lg ml-5 mt-2 mb-2 mr-1' type="text" name={`ingredients[${index}].food`} data-index={index} data-field="food" value={ingredient.food} onChange={handleChange} placeholder="Food"  required/>
                    <div></div>
                    <input className='rounded-lg ml-5 mt-2 mb-2 mr-1' type="number" name={`ingredients[${index}].quantity`} data-index={index} data-field="quantity" value={ingredient.quantity} onChange={handleChange} placeholder="Quantity"  required/>
                    <div></div>
                    <input className='rounded-lg ml-5 mt-2 mb-2 mr-1' type="text" name={`ingredients[${index}].unit`} data-index={index} data-field="unit" value={ingredient.unit} onChange={handleChange} placeholder="Unit"  required/> 
                        {formData.ingredients.length > 1 && (
                    <button 
                    type="button" 
                    onClick={() => handleDeleteIngredient(index)}
                    className=" ml-5 bg-red-500 text-white ml-1 px-1.5 rounded hover:bg-red-600"
                    >
                              X
                    </button>
                   
                          )}
                </div>
               
                </div>
            ))}
          
            <button className='border bg-blue-400  px-2 p-0.5 rounded-lg mt-2 mb-2 mr-1' type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>Steps?</Accordion.Title>
                <Accordion.Content >
                    <table className="table-auto">
                      {formData.steps.map((step, index) => (
                        <React.Fragment key={`step-${index}`}> {/* Add key prop */}
                          <thead>
                        <tr>
                            <th className='text-left'>Step {index+1}:</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <input 
                                type="text" 
                                value={step} 
                                onChange={(e) => handleChangeStep(index, e.target.value)} 
                                placeholder={`Step ${index + 1}`} 
                                className="border border-gray-400 rounded p-2 my-1"
                                required
                            />
                        </td>
                        <td>
                                {formData.steps.length > 1 && (
                                    <button 
                                    type="button" 
                                    onClick={() => handleDeleteStep(index)}
                                    className="bg-red-500 text-white ml-1  px-1.5 rounded hover:bg-red-600"
                                    >
                                    X
                                    </button>
                                )}
                        </td>        
                    </tr>
                    </tbody>
                        </React.Fragment>
                    ))}
                    </table>
                    <button  className='border mt-2 bg-blue-400  px-2 p-0.5 rounded-lg mb-2 mr-1' type="button" onClick={handleAddStep}>Add Step</button>
                </Accordion.Content>
            </Accordion.Panel>
            </Accordion>

        <div className='flex flex-row items-center justify-center'> 
            <Button  gradientMonochrome="success"  className='mt-4 px-4 py-2'  type="submit">Create Recipe</Button>
        </div>
    </form>
    </div>
    </div>
    </div> 
    );
};

export default CreateNewRecipe;
