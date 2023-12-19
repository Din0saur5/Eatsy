// Login.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import Navbar from '../components/Navbar';
const Login = () => {
  
  let navigate = useNavigate()
  
  
  const [formInfo, setFormInfo] = useState({
    email: '',
    password: ''
    
  });
 
  
  const handleChange = (e) => {
    const{name, value} = e.target
    setFormInfo({...formInfo, [name]:value})
  }

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
    <Card className="max-w-sm" >
      <form className="flex flex-col gap-4" onSubmit={(e)=>{handleLogin(e)}}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput name='email' value={formInfo.email} onChange={handleChange} id="email1" type="email" placeholder="name@Eatsy.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput name='password' value={formInfo.password} onChange={handleChange} id="password1" type="password" required />
        </div>
        <div className="flex items-center gap-2">
        </div>
        <Button gradientMonochrome="success"  type="submit">Submit</Button>
      </form>
      <small className='dark:text-white'>Don&apos;t have an account? <Link style={{color:"green"}} to ='/signup'>Sign Up</Link></small>
    </Card>
    </div>
    </div>
    </>
  );
};

export default Login;
