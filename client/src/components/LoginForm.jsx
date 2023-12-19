import React, { useState } from 'react'
import { Button, Card, Label, TextInput } from 'flowbite-react';


const LoginForm = ({handleLogin, setShowLogin}) => {

  const [formInfo, setFormInfo] = useState({
    email: '',
    password: ''
    
  });
 
  
  const handleChange = (e) => {
    const{name, value} = e.target
    setFormInfo({...formInfo, [name]:value})
  }
  return (
    
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
    
  )
}

export default LoginForm
