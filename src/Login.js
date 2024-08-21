import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
        console.log(isAuthenticated)
      navigate('/adminPage');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', 
      });

      if (response.ok) {
        login();
        navigate('/adminPage');
      } else {
        alert('Invalid credentials, please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center"> 
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-2 mb-4 w-full rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 mb-4 w-full rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default Login;
