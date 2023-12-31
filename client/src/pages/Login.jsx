import { useEffect, useState } from 'react';
import { Link, redirect, useNavigate, useOutletContext } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { Card } from 'flowbite-react';
import SignupForm from '../components/SignupForm';
const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [userData, setUserData] = useOutletContext(); 
  
const navigate = useNavigate();


  useEffect(()=>{
    navigate('/dashboard')

  },[userData]) 
  
 


  return (
    <> 
    
    <div className='bg-background5 bg-cover' >
      <div className="flex justify-center items-center h-screen">
        <Card className="max-w-sm">
            {showLogin ? (
              <>
                <LoginForm onLogin={setUserData}/>
                <small className='dark:text-white'>Don&apos;t have an account? <span style={{color:"green"}} onClick={()=>setShowLogin(false)} to ='/signup'>Sign Up</span></small>
                </>
              ):
              (
                <>
                <SignupForm onLogin={setUserData}/>
                <small className='dark:text-white'>Already have an account? <span style={{color:"green"}} onClick={()=>setShowLogin(true)}>Log-In</span></small>
                </>
              )
          } 
           
        
        
        </Card>
      </div>
    </div>
    </>
  );
};

export default Login;
