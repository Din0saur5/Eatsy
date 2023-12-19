// Login.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';
import { Card } from 'flowbite-react';
const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try{

      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: formInfo.email, 
        password: formInfo.password, });
            
      if (error) throw error;
      console.log(data)
      if(data){
        sessionStorage.setItem('token',JSON.stringify(data))
        location.reload()
        
      } 
       
      
    } catch (error){
      alert(error)
    }
    
  };



  return (
    <> 
    <Navbar/> 
    <div className='bg-background5 bg-cover' >
      <div className="flex justify-center items-center h-screen">
        <Card className="max-w-sm">
            {showLogin ? (
                
              ):
              (


              )
          } 
           
        <small className='dark:text-white'>Don&apos;t have an account? <span style={{color:"green"}} onClick={()=>setShowLogin(true)} to ='/signup'>Sign Up</span></small>
        <small className='dark:text-white'>Already have an account? <span style={{color:"green"}} onClick={()=>setShowLogin(true)}>Log-In</span></small>
        </Card>
      </div>
    </div>
    </>
  );
};

export default Login;
