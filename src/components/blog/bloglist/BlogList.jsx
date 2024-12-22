import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const BlogList = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:4000/blogs");
        if (user) {
          // Filter blogs by the current authenticated user
          const userBlogs = response.data.filter(
            (blog) => blog.creator === user.email
          );
          setBlogs(userBlogs);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/blogs/${id}`);
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        toast.success("Blog deleted successfully!");
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting blog:", error);
        Swal.fire(
          "Error!",
          "Failed to delete the blog. Please try again.",
          "error"
        );
      }
    }
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

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
        <div className="main">
          <div className="main-body">
            <h1 className="blog-container-head">Your Blogs</h1>
            {blogs.length > 0 ? (
              <div className="blog-lists">
                {blogs.map((blog) => (
                  <div className="blog-list-item" key={blog.id}>
                    <h2 className="blog_title">{blog.title}</h2>
                    {blog.image && (
                      <img
                        className="blog-list-image"
                        src={blog.image}
                        alt={blog.title}
                      />
                    )}
                    <p>
                      <strong>Category:</strong> {blog.category}
                    </p>
                    <p>{blog.content.substring(0, 100)}...</p>
                    <Link className="btn-action" to={`/blog/${blog.id}`}>
                      View Details
                    </Link>
                    {" | "}
                    <Link className="btn-action" to={`/edit-blog/${blog.id}`}>
                      Edit
                    </Link>
                    {" | "}

                    {/* <p><strong>Date Created:</strong> {blog.dateCreated}</p> */}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No blogs found. Create your first blog!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
