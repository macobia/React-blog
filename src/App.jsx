import { useState } from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import Blog from "./components/Blog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/blog/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import BlogList from "./components/blog/bloglist/BlogList";
import CreateBlog from "./components/blog/createblog/CreateBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blog-list" element={<Blog />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute restrictedTo="loggedIn">
                <Dashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/blogs"
            element={
              <ProtectedRoute restrictedTo="loggedIn">
                <BlogList />
              </ProtectedRoute>
            }
          />
           <Route
            path="/create-blog"
            element={
              <ProtectedRoute restrictedTo="loggedIn">
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={
             <ProtectedRoute restrictedTo="loggedOut">
              <Login/>
             </ProtectedRoute>
          } />
          <Route path="/register" element={
             <ProtectedRoute restrictedTo="loggedOut">
              <Register/>
             </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
