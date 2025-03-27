import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const API_URL = 'http://127.0.0.1:5000/api/blogs/api/my-blogs';



  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }
    axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, [token, navigate]);

  // Function to truncate content to 100 characters and add ellipsis
  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://127.0.0.1:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!token) return null; // Redirected to /auth

  return (
    <div>
      <h1 className='text-red-100'>My Blogs</h1>
      {blogs.length === 0 ? (
        <p>You haven’t written any blogs yet.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{blog.title}</h3>
            <p style={{ margin: '0 0 10px 0', color: '#666' }}>
              {truncateContent(blog.content)}
            </p>
            <p><em>Created on {new Date(blog.createdAt).toLocaleDateString()}</em></p>
            <button
              onClick={() => navigate(`/edit/${blog._id}`)}
              style={{ marginRight: '10px' }}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBlogs;