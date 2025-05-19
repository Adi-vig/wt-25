import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('auth/login', { email, password })
      .then(res => {
        alert('Login successful!');
        navigate('/catalogue');
      })
      .catch(err => {
        console.error('Login error:', err.response?.data || err.message);
        alert('Invalid credentials.');
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card" style={{ width: '30rem' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100" type="submit">Login</button>
          </form>
          <div className="text-center mt-3">
            <p>Don't have an account? <a href="/register">Register here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
