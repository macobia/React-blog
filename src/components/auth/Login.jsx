import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password){
      setError("Please fill out all fields")
      return;
    }

    try{
      await signInWithEmailAndPassword(auth,email,password)
      navigate('/')
    }catch (error){
      toast.error('Invalid email or password')
      console.error(error.message)
    }
  }

  return (
    <form className='login-form' onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="email" className='form-label'>Email</label>
            <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-input' placeholder="Enter Email Address" />
        </div>
        <div className="form-group">
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-input' placeholder="Enter password" />
        </div>
        {error && <p style={{color: "red"}}>{error}</p> }
        <button className='submit-button' type='submit'>Login</button>
    </form>
  )
}

export default Login