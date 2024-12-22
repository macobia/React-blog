import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners"; // Import a specific spinner

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:4000/blogs");
        setBlogs(response.data);
        setFilteredBlogs(response.data); // Initialize with all blogs
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredBlogs(blogs); // Show all blogs
    } else {
      const filtered = blogs.filter((blog) => blog.category === category);
      setFilteredBlogs(filtered);
    }
  };

  if (loading)
    return (
      <div
        className="loader"
      >
        <BounceLoader color="#007bff" size={50} /> {/* Spinner component */}
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="blog-container">
      <h1 className="blog-container-head">Blogs</h1>

      {/* Filter Options */}
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => handleCategoryChange("All")}
          className={`category-button ${
            selectedCategory === "All" ? "selected" : ""
          }`}
        >
          All
        </button>
        {["Business", "Tech", "Lifestyle", "Entertainment"].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`category-button ${
              selectedCategory === category && "selected"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display Blogs */}
      {filteredBlogs.length > 0 ? (
        <div className="blog-lists">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="blog-list-item">
              <h2 className="blog_title">{blog.title}</h2>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="blog-list-image"
                />
              )}
              <p>
                <strong>Category:</strong> {blog.category}
              </p>
              <p>{blog.content.substring(0, 100)}...</p>
              <Link className="btn-action" to={`/blog-detail/${blog.id}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs found for the selected category.</p>
      )}
    </div>
  );
};

export default Blog;
