import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    axios.get(`${API_URL}/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/blogs/${id}/comments`, { content: comment },
        { headers: { Authorization: `Bearer ${token}` } });
      setBlog(res.data);
      setComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${API_URL}/api/blogs`, { headers: { Authorization: `Bearer ${token}` } });
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600 text-lg">Loading...</p>
    </div>
  );

  const isOwner = user && blog.userId === user.id;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <div className="prose max-w-none mb-6">
            <ReactQuill value={blog.content} readOnly theme="bubble" />
          </div>
          <p className="text-sm text-gray-600 italic">
            By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
          </p>

          {/* Owner Controls */}
          {isOwner && (
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => navigate(`/edit/${id}`)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Comments</h3>
          
          {/* Comments List */}
          {blog.comments.length > 0 ? (
            <div className="space-y-4 mb-6">
              {blog.comments.map((c, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <p className="text-gray-800">{c.content}</p>
                  <p className="text-sm text-gray-600 italic mt-1">
                    {c.author}, {new Date(c.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mb-6">No comments yet.</p>
          )}

          {/* Comment Form */}
          {token ? (
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Add a Comment
                </label>
                <textarea
                  id="comment"
                  placeholder="Write your comment here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-y min-h-[100px]"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Post Comment
              </button>
            </form>
          ) : (
            <p className="text-gray-600">
              Please{' '}
              <a href="/auth" className="text-indigo-600 hover:text-indigo-800 font-medium">
                login
              </a>{' '}
              to comment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;