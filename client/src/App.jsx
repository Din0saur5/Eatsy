

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

import CreateRecipe from "./pages/CreateRecipe";
import Account from "./pages/Account";
import UpdateRecipe from "./pages/UpdateRecipe";
import checkSession from "./checkSession";

const protectedRoute = async () => {
  const auth = await checkSession()
  if (!auth){
    return redirect("/login"); 
  }
  return auth;
}

const protectedRendering = async () => {
  const auth = await checkSession()
  console.log(auth)
  return auth
}


const router = createBrowserRouter([
  {
    path: "/meals/:mealType",
    element: <MealPage />,
  },
  {
    path: "/ingredients/:ingredient",
    element: <IngredientPage />, // Add this line for ingredient route
  },
  
  {
    path: '/',
    element: <BaseLayout/>,
    
    errorElement: <ErrorPage/>,
    children:[
      {
        path: "",
        element: <Home/>,
        loader: protectedRendering, 
      },
      {
        path: "login",
        element: <Login/>,
        loader: protectedRendering, 
      },
      {
        path: "search/",
        element: <SearchList/>,
        loader: protectedRendering, 
        
      }, 
      {
        path: "recipe/:id",
        element: <Recipe/>,
        loader: protectedRendering,
       
        
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
      },
      {
        path: "create-recipe",
        element: <CreateRecipe/>,
        loader: protectedRoute,
      },
      {
        path: "edit-recipe/:id",
        element: <UpdateRecipe/>,
        loader: protectedRoute,
      }
    
            
            
      
      
    ]
  }
]

);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);