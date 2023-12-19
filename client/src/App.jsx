

import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider, useParams, } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import ErrorPage from './pages/ErrorPage';

import './App.css';
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
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
  return null;
}

const protectedRendering = async () => {
  const auth = await checkSession()
  return auth
}

const alreadyLoggedIn = async () => {
  const auth = await checkSession()
  if (auth){
    return redirect("/dashboard"); 
}
return null
}

const router = createBrowserRouter([
  {
    path: "/0",
    element: <BaseLayout/>,
    loader: protectedRendering,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: "/0",
        element: <Home/>,
        loader: alreadyLoggedIn,
      },
      {
        path: "/signup",
        element: <SignUp/>,
        loader: alreadyLoggedIn,
      },
      {
        path: "/login",
        element: <Login/>,
        loader: alreadyLoggedIn,
      },
      {
        path: "/search/:query",
        element: <SearchList/>, 
        
      }, 
      {
        path: "/recipe/:id",
        element: <Recipe/>,
       
        
      },    
      {
        path:"/dashboard",
        element: <Dashboard/>,
        loader: protectedRoute,
      },
      {
        path: "/account",
        element: <Account/>,
        loader: protectedRoute,
      },
      {
        path: "/create-recipe",
        element: <CreateRecipe/>,
        loader: protectedRoute,
      },
      {
        path: "/edit-recipe/:id",
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