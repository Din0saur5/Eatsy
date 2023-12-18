// Dashboard.jsx
import { Button } from 'flowbite-react';
import { useEffect, useState } from "react";
import NavbarUser from '../components/NavbarUser';
import { useOutletContext } from "react-router-dom";

const server = import.meta.env.VITE_BACK_END_SERVE




const Dashboard = () => {
  const [userData, setUserData] = useOutletContext();
 const {email, id, username, first_name, last_name} = userData
 console.log(userData)
 return (
  <>
    <NavbarUser />
    <div>
      <h1>Dashboard</h1>
      <p>Hello, ! your email is {email} and your user id is {id}</p>
      
    <div>
      <Button color='blue'>Click me</Button>
    </div>
 

    </div>
    </>
  );
};

export default Dashboard;
