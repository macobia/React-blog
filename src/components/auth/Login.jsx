import React from 'react'

const Login = () => {
  return (
    <form className='login-form'>
        <div className="form-group">
            <label htmlFor="email" className='form-label'>Email</label>
            <input type="email" id='email' className='form-input' placeholder="Enter Email Address" />
        </div>
        <div className="form-group">
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" id='password' className='form-input' placeholder="Enter password" />
        </div>
        <button className='submit-button' type='submit'>Login</button>
    </form>
  )
}

export default Login