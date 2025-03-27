import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home'; // New landing page component
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogForm from './components/BlogForm';

import MyBlogs from './components/MyBlogs';
import Footer from './components/Footer'; // New footer component
import { AuthProvider } from './contexts/AuthContext';
import Auth from './components/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} /> {/* Updated to use Home */}
              <Route path="/blogs" element={<BlogList />} /> {/* Moved BlogList to /blogs */}
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/create" element={<BlogForm />} />
              <Route path="/edit/:id" element={<BlogForm />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;