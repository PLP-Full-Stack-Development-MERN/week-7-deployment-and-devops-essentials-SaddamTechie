import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogForm from './components/BlogForm';
import Auth from './components/Auth';
import MyBlogs from './components/MyBlogs';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <nav>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/create">Create Blog</Link>
        </nav>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/edit/:id" element={<BlogForm />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// function App() {
//   const [blogs, setBlogs] = useState([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [author, setAuthor] = useState('');
//   const [editId, setEditId] = useState(null);

//   const API_URL = 'http://127.0.0.1:5000/api/blogs'; // Replace with your Render URL

//   // Fetch all blogs
//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setBlogs(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Create or Update a blog
//   const handleSubmit = async (e) => {
//     console.log('handleSubmit');
//     e.preventDefault();
//     if (!title || !content || !author) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     const blogData = { title, content, author };

//     try {
//       if (editId) {
//         // Update
//         const res = await axios.put(`${API_URL}/${editId}`, blogData);
//         setBlogs(blogs.map(blog => (blog._id === editId ? res.data : blog)));
//         setEditId(null);
//       } else {
//         // Create
//         const res = await axios.post(API_URL, blogData);
//         setBlogs([...blogs, res.data]);
//       }
//       setTitle('');
//       setContent('');
//       setAuthor('');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Edit a blog
//   const handleEdit = (blog) => {
//     setTitle(blog.title);
//     setContent(blog.content);
//     setAuthor(blog.author);
//     setEditId(blog._id);
//   };

//   // Delete a blog
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setBlogs(blogs.filter(blog => blog._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Personal Blog Platform</h1>

//       {/* Blog Form */}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           style={{ display: 'block', margin: '10px 0', width: '500px' }}
//         />
//         <input
//           type="text"
//           placeholder="Author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           required
//           style={{ display: 'block', margin: '10px 0', width: '300px' }}
//         />
//         <ReactQuill
//           theme="snow"
//           value={content}
//           onChange={(value) => setContent(value)}
//           placeholder="Content"
//           style={{ height: '200px', width: '500px', margin: '10px 0' }}
//           modules={{
//             toolbar: [
//               [{ header: [1, 2, 3, 4, 5, 6, false] }],
//               ['bold', 'italic', 'underline', 'strike'],
//               ['blockquote', 'code-block'],
//               [{ list: 'ordered' }, { list: 'bullet' }],
//               [{ script: 'sub' }, { script: 'super' }],
//               [{ indent: '-1' }, { indent: '+1' }],
//               [{ direction: 'rtl' }],
//               [{ font: [] }],
//               [{ align: [] }],
//               ['clean'],
//             ],
//           }}
//         />
//         <br /><br /><br /><br />
        
//         <button type="submit" style={{ pointerEvents: 'auto' }}>{editId ? 'Update Blog' : 'Create Blog'}</button>
//       </form>

//       {/* Blog List */}
//       <h2>Blogs</h2>
//       {blogs.length === 0 ? (
//         <p>No blogs yet.</p>
//       ) : (
//         blogs.map(blog => (
//           <div key={blog._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
//             <h3>{blog.title}</h3>
//             <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//             <p><em>By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</em></p>
//             <button onClick={() => handleEdit(blog)} style={{ marginRight: '10px' }}>Edit</button>
//             <button onClick={() => handleDelete(blog._id)}>Delete</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default App;
