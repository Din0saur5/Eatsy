import React, { useState } from 'react'
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { redirect, useNavigate } from 'react-router-dom';


const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();

  const server = import.meta.env.VITE_BACK_END_SERVE
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [formInfo, setFormInfo] = useState({
    username: '',
    password: ''
    
  });
  
  function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`${server}/login`, {
        credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formInfo.username,
        password: formInfo.password,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        navigate('/dashboard')
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  
  const handleChange = (e) => {
    const{name, value} = e.target
    setFormInfo({...formInfo, [name]:value})
  }
  return (
    
    <form className="flex flex-col gap-4" onSubmit={(e)=>{handleLogin(e)}}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username3" value="Your Username" />
        </div>
        <TextInput name='username' value={formInfo.username} onChange={handleChange} id="username3" type="text" placeholder="username" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput name='password' value={formInfo.password} onChange={handleChange} id="password1" type="password" required />
      </div>
      <div className="flex items-center gap-2">
      </div>
      <Button gradientMonochrome="success"  type="submit">{isLoading ? "Loading..." : "Login"}</Button>
      {errors ? errors.map((err) => (
          <small key={err}>{err}</small>
        )):<></>
        }
    </form>
    
  )
}

export default LoginForm
