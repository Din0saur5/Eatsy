
import { Outlet, useLoaderData } from 'react-router-dom';
import { Flowbite } from "flowbite-react";
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
const BaseLayout = () => {
  
  const auth = useLoaderData() 
  console.log(auth)
  const [userData, setUserData] = useState(auth)
  

    return(
      <>
      <Flowbite> 
        <Navbar onLogout={setUserData} userData={userData}/> 
        <Outlet context={[userData, setUserData]} />
      </Flowbite> 
      </>
    )
}

export default BaseLayout
