import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import NavbarUser from './NavbarUser';
import { Flowbite } from 'flowbite-react';
import checkSession from '../checkSession';

const PrivateRoute = () => {
 

  return (
    <>
        <Outlet />
    </>
  ) 
};

export default PrivateRoute;