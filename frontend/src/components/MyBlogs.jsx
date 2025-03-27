import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }
    axios.get(`${API_URL}/api/my-blogs`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, [token, navigate]);

  // Function to get first 100 words and add ellipsis (improved from character count)
  const getPreview = (content) => {
    const plainText = content.replace(/<[^>]+>/g, ''); // Remove HTML tags
    const words = plainText.split(/\s+/).filter(word => word.length > 0);
    const previewWords = words.slice(0, 100);
    return previewWords.length < words.length ? `${previewWords.join(' ')}...` : previewWords.join(' ');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${API_URL}/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Done')
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!token) return null; // Redirected to /auth

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Blogs</h1>

        {blogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600">You haven’t written any blogs yet.</p>
            <button
              onClick={() => navigate('/create')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map(blog => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-150 ease-in-out"
              >
                <h3 className="text-xl font-semibold text-gray-900">{blog.title}</h3>
                <p className="text-gray-700 mt-2">{getPreview(blog.content)}</p>
                <p className="text-sm text-gray-600 italic mt-2">
                  Created on {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => navigate(`/edit/${blog._id}`)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;