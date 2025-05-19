// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';  // Link for navigation
import 'bootstrap/dist/css/bootstrap.min.css';  // Make sure Bootstrap is imported

function HomePage() {
  return (
    <div className="main-container">
      {/* Main Content */}
      <div className="content">
        <section className="hero hero-bg text-white text-center py-5">
          <div className="container">
            <h1 className="display-4 main-heading ">Welcome to Our Online Bookstore</h1>
            <p className="lead mb-4">Explore a wide variety of books, from fiction to non-fiction, and everything in between.</p>
            <div className="container ">
              <Link to="/catalogue" className="btn btn-light btn-lg mx-2">Browse Books</Link>
              <Link to="/login" className="btn btn-light btn-lg mx-2">Login</Link>
            <Link to="/register" className="btn btn-light btn-lg mx-2">Register</Link>
            </div>
          </div>
        </section>

        {/* More content goes here */}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p>&copy; Created by Aditya Sakhare</p>
        </div>
      </footer>
    </div>
  
  );
}

export default HomePage;
