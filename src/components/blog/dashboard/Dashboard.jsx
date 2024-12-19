import React from 'react'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <div className="container">
        <div className="sidebar">
          <h2 className="sidebar-heading">Dashboard</h2>
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to={'/blogs'}>Blogs</NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to={'/create-blog'}>Create Blog</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="main">

        </div>
      </div>
    </div>
  )
}

export default Dashboard