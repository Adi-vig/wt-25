import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  return (
    <div className="main-container">
      {/* Hero Section */}
      <section className="bg-success text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Online Grocery Shop</h1>
          <p className="lead mb-4">Get fresh groceries delivered to your doorstep.</p>
          <div>
            <Link to="/catalogue" className="btn btn-light btn-lg mx-2">Browse Products</Link>
            <Link to="/login" className="btn btn-outline-light btn-lg mx-2">Login</Link>
            <Link to="/register" className="btn btn-outline-light btn-lg mx-2">Register</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; Created by Aditya Sakhare.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
