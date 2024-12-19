import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const CreateBlog = () => {
  const { user } = useAuth(); //Get authenticated user
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((f) => ({ ...f, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create a blog");
      return;
    }
    setLoading(true);
    try {
      // Step 1: Upload the image to Cloudinary
      const formData = new FormData();
      formData.append("file", form.image);
      formData.append("upload_preset", "blog_images_upload"); // Replace with your preset
      formData.append("cloud_name", "dn66uj2i1"); // Replace with your Cloudinary cloud name

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dn66uj2i1/image/upload", // Replace with your Cloudinary API URL
        formData
      );

      const imageUrl = cloudinaryResponse.data.url; // URL of the uploaded image

      // Step 2: Create the blog with the uploaded image URL
      const newBlog = {
        title: form.title,
        category: form.category,
        content: form.content,
        image: imageUrl, // Use the Cloudinary URL
        dateCreated: new Date().toISOString(),
        creator: user.email,
      };
      await axios.post("http://localhost:4000/blogs", newBlog);
      toast.success("Blog created successfully!");
      setForm({ title: "", category: "", content: "", image: null }); // Reset form
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="sidebar">
          <h2 className="sidebar-heading">Dashboard</h2>
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to={"/blogs"}>
                  Blogs
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to={"/create-blog"}>
                  Create Blog
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="main">
          <div className="main-">
            <h1 className="form-heading">Create Blog</h1>
            <form className="blog-form" onSubmit={handleSubmit}>
              <label className="form-label">Blog Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="title"
                name="title"
              />
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-select"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
                <option value="Entertainment">Entertainment</option>
              </select>
              <label className="form-label">Blog Content</label>
              <textarea
                name="content"
                className="form-textarea"
                value={form.content}
                onChange={handleChange}
                required
                placeholder="Enter Blog Content"
              ></textarea>
              <label className="form-label">Blog Image</label>
              <input
                type="file"
                className="form-input-file"
                onChange={handleFileChange}
                required
                name="image"
                accept="image/*"
              />
              <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Creating Blog..." : "Create Blog"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
