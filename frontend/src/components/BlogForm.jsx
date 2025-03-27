import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const API_URL = 'http://127.0.0.1:5000/api/blogs';
  const token = localStorage.getItem('token');

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

  if (!token) return <p>Please <Link to="/auth">login</Link> to create or edit a blog.</p>;

  return (
    <div>
      <h1>{id ? 'Edit Blog' : 'Create Blog'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <ReactQuill
          value={content}
          onChange={(content) => setContent(content)}
          placeholder="Content"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline'],
              ['image', 'code-block']
            ]
          }}
        />
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default BlogForm;
