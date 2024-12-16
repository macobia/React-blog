import { useState } from 'react'
import './App.css'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/Home'
import Blog from './components/Blog'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/blog/Dashboard'
import Navbar from './components/navbar/Navbar'
import NotFound from './components/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
  <>
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='blog-list' element={<Blog/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
  <ToastContainer/>

  </>
  )
}

export default App
