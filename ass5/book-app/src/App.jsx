import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import CataloguePage from './components/CataloguePage';
import RegistrationPage from './components/RegistrationPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import CartPage from './components/CartPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={ <HomePage/> } />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/catalogue" element={<CataloguePage/>} />
        <Route path="/register" element={<RegistrationPage/>} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;