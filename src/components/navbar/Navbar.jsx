import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, userDetails } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
      console.log(error);
    }
  };
  return (
    <div className="header">
      <div>
        <Link to="/">LOGO</Link>
      </div>
      <div className="link-wrapper">
        <NavLink className="header-link" to="/">
          Home
        </NavLink>
        <NavLink className="header-link" to="blog-list">
          Blog
        </NavLink>

        {!user ? (
          <>
            <NavLink className="btn" to="login">
              Login
            </NavLink>
            <NavLink className="btn" to="register">
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="header-link" to="dashboard">
              Dashboard
            </NavLink>
            <span className="navbar-user">
              Welcome, {userDetails && userDetails.name}
            </span>
            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
