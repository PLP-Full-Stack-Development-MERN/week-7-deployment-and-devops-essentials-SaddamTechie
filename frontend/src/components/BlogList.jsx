import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const API_URL = 'http://127.0.0.1:5000/api/blogs';

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  // Function to get first 100 words and add ellipsis
  const getPreview = (content) => {
    // Remove HTML tags if content is from ReactQuill
    const plainText = content.replace(/<[^>]+>/g, '');
    const words = plainText.split(/\s+/).filter(word => word.length > 0);
    const previewWords = words.slice(0, 100);
    return previewWords.length < words.length ? `${previewWords.join(' ')}...` : previewWords.join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Blog List</h1>

        {blogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600">No blogs yet.</p>
          </div>
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
                <p className="text-sm text-gray-600 italic mt-2">
                  By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mt-3">
                  {getPreview(blog.content)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogList;