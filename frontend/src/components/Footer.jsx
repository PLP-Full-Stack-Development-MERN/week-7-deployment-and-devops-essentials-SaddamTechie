import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-white font-bold text-xl hover:text-indigo-300 transition duration-150 ease-in-out">
              BlogApp
            </Link>
            <p className="mt-2 text-sm">A platform for sharing your stories.</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-indigo-300 transition duration-150 ease-in-out">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-indigo-300 transition duration-150 ease-in-out">
                  All Blogs
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-indigo-300 transition duration-150 ease-in-out">
                  Create Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/my-blogs" className="hover:text-indigo-300 transition duration-150 ease-in-out">
                  My Blogs
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-indigo-300 transition duration-150 ease-in-out">
                  Login/Signup
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;