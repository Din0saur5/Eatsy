// Login.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';
import { Card } from 'flowbite-react';
import SignupForm from '../components/SignupForm';
const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [userData, setUserData] = useOutletContext(); 
  

 


  return (
    <> 
    <Navbar/> 
    <div className='bg-background5 bg-cover' >
      <div className="flex justify-center items-center h-screen">
        <Card className="max-w-sm">
            {showLogin ? (
                <LoginForm onLogin={setUserData}/>
              ):
              (
                <SignupForm onLogin={setUserData}/>

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
