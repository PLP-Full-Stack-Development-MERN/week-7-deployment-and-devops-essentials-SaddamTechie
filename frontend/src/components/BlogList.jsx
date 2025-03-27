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

  return (
    <div>
      <h1>Blog List</h1>
      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3><Link to={`/blog/${blog._id}`}>{blog.title}</Link></h3>
            <p><em>By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</em></p>
          </div>
        ))
      )}
      <Link to="/auth">Login/Register</Link>
    </div>
  );
}

export default BlogList;