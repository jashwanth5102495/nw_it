import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';


const StudentLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log(`Sending request:\n          username: ${loginData.username}\n          password: ${loginData.password}\n        `);
      // Call backend API for authentication
      const response = await fetch(`${BASE_URL}/api/students/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password
        })
      });

      let result: any = null;
      let rawText = '';
      try {
        result = await response.json();
      } catch (parseError) {
        rawText = await response.text();
      }
      console.log(result || rawText);
      if (response.ok && result && result.success) {
        // Set authentication flag and store user data
        const userData = {
          ...result.data.student,
          isAuthenticated: true,
          token: result.data.token
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        console.log(localStorage.getItem('currentUser'));
        // Redirect to student portal
        navigate('/student-portal');
      } else {
        const errMsg = (result && (result.message || result.error)) || rawText || 'Invalid credentials. Please check your username and password.';
        setError(errMsg);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Student Login
            </h1>
            <p className="text-xl text-gray-300">Access your learning portal</p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </form>



            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/student-registration')}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Register here
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;