// src/components/RegistrationPage.jsx
import React, { useState } from 'react';
import API from '../api/api';  // Import the custom API service
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import 'bootstrap/dist/css/bootstrap.min.css';  // Make sure Bootstrap is imported

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Using useNavigate instead of useHistory

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sending registration data to the backend
    API.post('register', { username, email, password })  // API call to register the user
      .then(response => {
        alert('Registration successful!');
        navigate('/login');  // Navigate to the login page after successful registration
      })
      .catch(error => {
        console.error('Registration failed:', error);
        alert('Error during registration. Please try again.');
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card" style={{ width: '30rem' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <div className="text-center mt-3">
            <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
