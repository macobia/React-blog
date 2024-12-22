import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import { toast } from "react-toastify";

const EditBlog = () => {
  const { user } = useAuth(); // Get authenticated user
  const navigate = useNavigate();
  const { blogId } = useParams(); // Extract blogId from URL
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    image: null, // For new file upload
    existingImage: "", // To display the existing image
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/blogs/${blogId}`
        );
        setForm({
          ...response.data,
          image: null, // Clear the new file field
          existingImage: response.data.image, // Populate with the existing image URL
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = form.existingImage; // Default to existing image

    // If a new image is uploaded, handle Cloudinary upload
    if (form.image) {
      const formData = new FormData();
      formData.append("file", form.image);
      formData.append("upload_preset", "blog_images_upload"); // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dn66uj2i1/image/upload", // Replace with your Cloudinary URL
          formData
        );
        imageUrl = response.data.secure_url; // Update the image URL
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload the image. Please try again.");
        setLoading(false);
        return;
      }
    }

    // Update the blog with the new or existing image URL
    const updatedBlog = {
      title: form.title,
      category: form.category,
      content: form.content,
      image: imageUrl,
      // dateCreated: form.dateCreated,
      creator: user.email,
    };

    try {
      await axios.put(`http://localhost:4000/blogs/${blogId}`, updatedBlog);
      toast.success("Blog updated successfully!");
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update the blog. Please try again.");
    }

    setLoading(false);
  };

  if (!form.title && !form.existingImage) return <p>Loading...</p>;

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
            <h1 className="form-heading">Edit Blog</h1>
            <form className="blog-form" onSubmit={handleSubmit}>
              <label className="form-label">Blog Title</label>
              <input
                type="text"
                className="form-input"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-select"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
                <option value="Entertainment">Entertainment</option>
              </select>
              <label className="form-label">Blog Content</label>
              <textarea
                name="content"
                className="form-textarea"
                placeholder="Content"
                value={form.content}
                onChange={handleChange}
                required
              />
              <label className="form-label">Existing Image</label>
              <img
                className="img-input"
                src={form.existingImage}
                alt="Existing Blog"
                width="150"
              />
              <input
                type="file"
                className="form-input-file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Blog"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
