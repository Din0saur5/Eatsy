// SignUp.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import Navbar from '../components/Navbar';
const server = import.meta.env.VITE_BACK_END_SERVE

const SignUp = () => {
  let navigate = useNavigate() 
  const [formInfo, setFormInfo] = useState({
    email: '',
    password: '',
    username: '',
    first_name: '',
    last_name: '',
    
  });
  const [checked, setChecked] = useState(false);
  const handleTerms = () => {
    setChecked(!checked);
  };
  const handleCheck = (event) => {
    setChecked(event.value);
  };
  const postPublicUser = (user) => {
    console.log(user)
    const postData = {
      id: user.user.id,
      username: formInfo.username,
      first_name: formInfo.first_name,
      last_name: formInfo.last_name

    }
    fetch(`${server}/users`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type header
      },
      body: JSON.stringify(postData), // Convert the JavaScript object to a JSON string
    })
    .then(response => response.json() )
    .then(data => {
      console.log(data) // Handle the response data
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error); // Handle any errors
      
    });
    } 
    
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try{
    const { data , error } = await supabase.auth.signUp({
        email:formInfo.email, 
        password:formInfo.password,
        disable_email_confirmation: true,
    })
     .then(()=>{postPublicUser(data)
      setFormInfo({
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        
       
      });
      alert("Check your email vor verification link");
      navigate('/login')
    }
      )

    if (error) throw error;
    
   
    } catch (error){
        console.log('Error signing up:', error.message)
        alert(error)
    }
  
   
  };
  const handleChange = (e) => {
    e.preventDefault()
    const{name, value} = e.target
    setFormInfo({...formInfo, [name]:value})
    console.log(formInfo)
  }
  

  return (
    <> 
      <Navbar/>
<div className='bg-background5 bg-cover'>
<div className='flex justify-center items-center h-screen'> 
<Card className="max-w-sm">
<form className="max-w-md mx-auto" onSubmit={(e)=>handleSignUp(e)}>
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name='email' value={formInfo.email} onChange={handleChange} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name='password' value={formInfo.password} onChange={handleChange} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="username3" name='username' onChange={handleChange} value={formInfo.username} id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div>
 
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="first_name" value={formInfo.first_name} onChange={handleChange} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" name='last_name' value={formInfo.last_name} onChange={handleChange} id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>
  </div>
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="terms" name= "terms" onClick={handleTerms} value={checked} onChange={handleCheck} type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
    </div>
    <label htmlFor="terms" className="ms-2 text-sm font-light text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-green-600 hover:underline dark:text-green-500">terms and conditions</a></label>
  </div>
  <Button gradientMonochrome="success" type="submit">Register new account</Button>
  </form>
  <small className='dark:text-white'>Already have an account? <Link style={{color:"green"}} to ='/login'>Log-In</Link></small>

</Card>
</div>
</div>
    </> 
  );
};

export default SignUp;
