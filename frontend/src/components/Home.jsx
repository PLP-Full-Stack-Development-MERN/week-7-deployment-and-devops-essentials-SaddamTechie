import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/api/blogs`)
      .then(res => setBlogs(res.data.slice(0, 3))) // Show only 3 blogs
      .catch(err => console.error(err));
  }, []);

  console.log("API URL",);

  const getPreview = (content) => {
    const plainText = content.replace(/<[^>]+>/g, '');
    const words = plainText.split(/\s+/).filter(word => word.length > 0);
    const previewWords = words.slice(0, 100);
    return previewWords.length < words.length ? `${previewWords.join(' ')}...` : previewWords.join(' ');
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section with Background Image and Full Overlay */}
      <section
        className="relative bg-indigo-600 text-white py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1683309565422-77818a287060?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to BlogApp
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover, create, and share your stories with a community of writers and readers.
          </p>
          <div className="space-x-4">
            <Link
              to="/create"
              className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Start Writing
            </Link>
            <Link
              to="/blogs"
              className="inline-block bg-indigo-800 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Explore Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Featured Blogs
          </h2>
          {blogs.length === 0 ? (
            <p className="text-gray-600 text-center">Loading blogs...</p>
          ) : (
            <div className="space-y-6">
              {blogs.map(blog => (
                <div
                  key={blog._id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-150 ease-in-out"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out"
                    >
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-gray-700 mt-2">{getPreview(blog.content)}</p>
                  <p className="text-sm text-gray-600 italic mt-2">
                    By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              <div className="text-center mt-6">
                <Link
                  to="/blogs"
                  className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150 ease-in-out"
                >
                  View All Blogs
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;