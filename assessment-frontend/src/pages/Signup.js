import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-indigo-800 hover:text-indigo-900 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h2 className="text-2xl font-bold text-center text-gray-800 flex-1 pr-10">Create an Account</h2>
        </div>
        
        {error && <div className="p-3 mb-6 bg-red-100 text-red-800 border border-red-200 rounded-md">{error}</div>}
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:border-indigo-800 focus:ring-2 focus:ring-indigo-100 outline-none transition-colors"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:border-indigo-800 focus:ring-2 focus:ring-indigo-100 outline-none transition-colors"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:border-indigo-800 focus:ring-2 focus:ring-indigo-100 outline-none transition-colors"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:border-indigo-800 focus:ring-2 focus:ring-indigo-100 outline-none transition-colors"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 px-6 bg-indigo-800 hover:bg-indigo-900 text-white font-medium rounded-md transition-colors disabled:opacity-65 disabled:cursor-not-allowed" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="text-center mb-0 text-gray-500">
          Already have an account? <Link to="/login" className="text-indigo-800 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;