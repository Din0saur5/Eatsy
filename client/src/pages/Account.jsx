import React from 'react'
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
