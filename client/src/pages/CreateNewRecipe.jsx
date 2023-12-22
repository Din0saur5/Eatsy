import React from 'react';
import CreateRecipeForm from '../components/CreateRecipeForm'; // Adjust the path as per your project structure
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateNewRecipe = () => {
    const [userData, setUserData] = useOutletContext();
    const navigate = useNavigate();

    // Ensure userData is available here and is the correct object
    return (
        <div className="create-new-recipe-page">
            <h1>Create New Recipe</h1>
            <CreateRecipeForm userData={userData}/>
        </div>
    );
};

export default CreateNewRecipe;
