import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const API_URL = `http://127.0.0.1:5000/api/blogs/${id}`;
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/comments`, { content: comment},
      { headers: { Authorization: `Bearer ${token}` } });
      setBlog(res.data);
      setComment('');
      setCommentAuthor('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(API_URL, { headers: { Authorization: `Bearer ${token}` } });
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!blog) return <p>Loading...</p>;

  const isOwner = user && blog.userId === user.id;

  return (
    <div>
      <h1>{blog.title}</h1>
      <ReactQuill value={blog.content} readOnly theme="bubble" />
      <p><em>By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</em></p>
      {isOwner && (
        <div>
          <button onClick={() => navigate(`/edit/${id}`)} style={{ marginRight: '10px' }}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      <h3>Comments</h3>
      {blog.comments.map((c, idx) => (
        <div key={idx}>
          <p>{c.content} - <em>{c.author}, {new Date(c.createdAt).toLocaleDateString()}</em></p>
        </div>
      ))}
      {token ? (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            style={{ display: 'block', margin: '10px 0', width: '300px', height: '100px' }}
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p>Please <a href="/auth">login</a> to comment.</p>
      )}
    </div>
  );
}

export default BlogDetail;
