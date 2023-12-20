// Dashboard.jsx
import { Button } from 'flowbite-react';
import { useEffect, useState } from "react";
import NavbarUser from '../components/NavbarUser';
import { redirect, useOutletContext } from "react-router-dom";

const server = import.meta.env.VITE_BACK_END_SERVE




const Dashboard = () => {
  const [userData, setUserData] = useOutletContext();
  
  
 
 console.log(userData)
 return (
  <>
    <div>
      <h1>Dashboard</h1>
      <p></p>
      
    <div>
      <Button color='blue'>Click me</Button>
    </div>
 

    </div>
    </>
  );
};

export default Dashboard;
