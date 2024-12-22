import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { blogId } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/blogs/${blogId}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  if (!blog) return <p>Loading blog details...</p>;

  return (
    <div>
      <div className="container">
        <div className="sidebar">
          <h2 className="sidebar-heading">Dashboard</h2>
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to="/blogs">
                  Blogs
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to="/create-blog">
                  Create Blog
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <div className="main">
            <div className="main-body">
              <div className="blog-details">
                <h1 className="blog-title">{blog.title}</h1>
                <p className="blog-category">
                  <strong>Category:</strong> {blog.category}
                </p>
                {blog.image && (
                  <img
                    className="blog-image"
                    src={blog.image}
                    alt={blog.title}
                  />
                )}
                <p className="blog-content">{blog.content}</p>
              </div>

              {/* <p><strong>Date Created:</strong> {new Date(blog.dateCreated).toLocaleString()}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
