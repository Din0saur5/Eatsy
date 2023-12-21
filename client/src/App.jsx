

import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider, useParams, } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

import MealPage from "./pages/MealPage";
import IngredientPage from "./pages/IngredientPage";
import ErrorPage from './pages/ErrorPage';

import './App.css';
import Dashboard from "./pages/Dashboard";

import BaseLayout from "./components/BaseLayout";
import SearchList from "./pages/SearchList";

import Recipe from "./pages/Recipe";


import Account from "./pages/Account";
import UpdateRecipe from "./components/UpdateRecipe";
import checkSession from "./checkSession";

import RecipeSearchPage from "./pages/RecipeByName";

const protectedRoute = async () => {
  const auth = await checkSession()
  if (!auth){
    return redirect("/login"); 
  }
  return auth;
}

const protectedRendering = async () => {
  const auth = await checkSession()
  
  return auth
}


const router = createBrowserRouter([
 
  {
    path: '/',
    element: <BaseLayout/>,
    loader: protectedRendering,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: "meals",
        element: <RecipeSearchPage />,
      },
      {
        path: "/meals/:mealType",
        element: <MealPage />,
      },
      {
        path: "/ingredients/:ingredient",
        element: <IngredientPage />, // Add this line for ingredient route
      },
      {
        path: "",
        element: <Home/>,
         
      },
      {
        path: "/meals/:mealType",
        element: <MealPage />,
      },
      {
        path: "/ingredients/:ingredient",
        element: <IngredientPage />, // Add this line for ingredient route
      },
      
      {
        path: "login",
        element: <Login/>,
        
      },
      {
        path: "search/",
        element: <SearchList/>,
        
        
      }, 
      {
        path: "recipe/:id",
        element: <Recipe/>,
        
       
        
      },    
      {
        path:"dashboard",
        element: <Dashboard/>,
        loader: protectedRoute,
      },
      {
        path: "account",
        element: <Account/>,
        loader: protectedRoute,
      }   
            
            
      
      
    ]
  }
]

);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);