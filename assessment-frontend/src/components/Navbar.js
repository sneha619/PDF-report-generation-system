import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex justify-center items-center px-8 py-4 text-white gradient-bg">
      <div className="flex justify-between items-center w-full max-w-7xl">
        <Link to="/" className="flex items-center text-white font-semibold text-xl no-underline">
          <span>Assessment Management System</span>
        </Link>

        <div className="flex items-center">
          {currentUser ? (
            <>
              <span className="mr-4 font-light opacity-90">Hello, {currentUser.name || currentUser.username}</span>
              <button onClick={handleLogout} className="bg-transparent border-0 text-white cursor-pointer text-base font-medium p-0 transition-opacity hover:opacity-80">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white no-underline ml-6 font-medium transition-opacity hover:opacity-80">Login</Link>
              <Link to="/signup" className="text-white no-underline ml-6 font-medium transition-opacity hover:opacity-80">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;