import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false); // Close mobile menu on logout
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white font-bold text-xl hover:text-indigo-300 transition duration-150 ease-in-out">
              BlogApp
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              Create Blog
            </Link>
            <Link
              to="/my-blogs"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              My Blogs
            </Link>
            {token ? (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Login/Signup
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-150 ease-in-out"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu (shown when open) */}
        {isMobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 rounded-b-md">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                Home
              </Link>
              <Link
                to="/create"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                Create Blog
              </Link>
              <Link
                to="/my-blogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                My Blogs
              </Link>
              {token ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                >
                  Login/Signup
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;