import React from 'react'
import NavbarUser from '../components/NavbarUser'
import { useOutletContext } from "react-router-dom";

const Account = () => {
  const [userData, setUserData] = useOutletContext();
  return (
    <>
    <NavbarUser/>
    <div>
      
    </div>
    </>
  )
}

export default Account
