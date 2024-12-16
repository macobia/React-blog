import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='header'>
        <div>
            <a href="">LOGO</a>
        </div>
        <div className="link-wrapper">
            <NavLink className='header-link' to="/">Home</NavLink>
            <NavLink className='header-link' to="blog-list">Blog</NavLink>
            <NavLink className='header-link' to="dashboard">Dashboard</NavLink>
            <NavLink className='btn' to="login">Login</NavLink>
            <NavLink className='btn' to="register">Register</NavLink>
        </div>

    </div>
  )
}

export default Navbar