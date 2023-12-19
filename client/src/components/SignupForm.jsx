import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignupForm = ({ onLogin }) => {
    const server = import.meta.env.VITE_BACK_END_SERVE
    const [formInfo, setFormInfo] = useState({
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        
      });
      const [errors, setErrors] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [checked, setChecked] = useState(false);
      
      const handleTerms = () => {
        setChecked(!checked);
      };
      const handleCheck = (event) => {
        setChecked(event.value);
      };
    
      const handleSignUp = (e) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        
        fetch(`${server}/signup`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify the content type header
          },
          body: JSON.stringify({
            email: formInfo.email,
            password: formInfo.password,
            username: formInfo.username,
            first_name: formInfo.first_name,
            last_name: formInfo.last_name,
          }), // Convert the JavaScript object to a JSON string
        })
        .then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }
        
     
       
      
      const handleChange = (e) => {
        e.preventDefault()
        const{name, value} = e.target
        setFormInfo({...formInfo, [name]:value})
        console.log(formInfo)
      }
      
    
      return (
        <> 
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
            <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
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
        <Button gradientMonochrome="success" type="submit">{isLoading ? "Loading..." : "Register new account"}</Button>
        {errors ? errors.map((err) => (
          <small key={err}>{err}</small>
        )):<></>
        }
        </form>
        

      
</> 
  )
}

export default SignupForm
