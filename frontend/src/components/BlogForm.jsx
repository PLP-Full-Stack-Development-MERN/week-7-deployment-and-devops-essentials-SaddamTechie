import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const API_URL = 'http://127.0.0.1:5000/api/blogs';
  const token = localStorage.getItem('token');

  if (!token){
    navigate('/auth')
  }

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch(err => console.error(err));
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = { title, content };
    try {
      if (id) {
        await axios.put(`${API_URL}/${id}`, blogData, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(API_URL, blogData, { headers: { Authorization: `Bearer ${token}` } });
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {id ? 'Edit Blog' : 'Create Blog'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Content Editor */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="mt-1">
                <ReactQuill
                  value={content}
                  onChange={(content) => setContent(content)}
                  placeholder="Write your blog content here..."
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      ['bold', 'italic', 'underline'],
                      ['image', 'code-block']
                    ]
                  }}
                  className="bg-white border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                {id ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogForm;