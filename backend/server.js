const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

const Blog = require('./models/Blog');
const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));



// User Registration
app.post('/api/register', async (req, res) => {
  try {
    console.log('hashedPassword');
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Blog (Authenticated)
app.post('/api/blogs', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new Blog({ title, content, author: req.user.username, userId: req.user.id });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All Blogs (Public)
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('userId', 'username');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Blogs by Authenticated User
app.get('/api/my-blogs', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.user.id });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read Single Blog (Public)
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('userId', 'username');
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Blog (Owner Only)
app.put('/api/blogs/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    if (blog.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
    const { title, content } = req.body;
    blog.title = title;
    blog.content = content;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Blog (Owner Only)
app.delete('/api/blogs/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    if (blog.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
    await blog.remove();
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/blogs/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const blogId = req.params.id;

    // Update the blog by adding a new comment
    const updatedBlog = await Blog.updateOne(
      { _id: blogId },
      { $push: { comments: { content, author: req.user.username } } }
    );

    if (updatedBlog.modifiedCount === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Fetch the updated blog to return it in the response
    const blog = await Blog.findById(blogId);
    res.status(201).json(blog);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDB();
});