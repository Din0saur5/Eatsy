
import { Outlet, useLoaderData } from 'react-router-dom';
import { Flowbite } from "flowbite-react";
import { useEffect, useState } from 'react';

const BaseLayout = () => {
  const server = import.meta.env.VITE_BACK_END_SERVE
  const auth = useLoaderData() 

  const [userData, setUserData] = useState({
    id: '',
    email: '',
    username: '',
    first_name:'',
    last_name:'',
    reviews: '',
    recipes: '',
  })
 
  let email= ''
  let id = ''
  if (auth){
  const authData = JSON.parse(sessionStorage.getItem('token'))
  const {user} = authData
  
  id = user.id
  email= user.email
  }
  useEffect(()=>{
  fetch(`${server}/users/${id}`)
      .then((resp)=>{
      return resp.json()
      })
      .then((data)=>{
        setUserData({
            id: id,
            email: email,
            username: data.username,
            first_name:data.first_name,
            last_name:data.last_name,
            reviews: data.reviews,
            recipes: data.recipes,
            })
        
      })
      .catch(error=>{
        console.error(error)
        return
      })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])
  
  

    return(
      <>
      <Flowbite> 
      <Outlet context={[userData, setUserData]} />
      </Flowbite> 
      </>
    )
}

export default BaseLayout
