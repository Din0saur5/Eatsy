
import { Outlet, useLoaderData } from 'react-router-dom';
import { Flowbite } from "flowbite-react";
import { useEffect, useState } from 'react';

const BaseLayout = () => {
  
  const auth = useLoaderData() 

  const [userData, setUserData] = useState(auth)
    

    return(
      <>
      <Flowbite> 
      <Outlet context={[userData, setUserData]} />
      </Flowbite> 
      </>
    )
}

export default BaseLayout
