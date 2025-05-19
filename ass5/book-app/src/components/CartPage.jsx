// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Get cart from local storage (optional)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  // Update total price
  const calculateTotal = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price;
    });
    setTotal(totalPrice);
  };

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to local storage
    calculateTotal(updatedCart);
  };

  // Place Order
  const placeOrder = () => {
    const order = {
      items: cart,
      totalPrice: total,
    };
    axios.post('http://localhost:8080/api/order', order)
      .then(response => {
        // Handle order success, clear cart
        alert('Order placed successfully!');
        setCart([]);
        localStorage.removeItem('cart');
        navigate('/catalogue');  // Redirect to catalogue
      })
      .catch(error => {
        console.error('Error placing order', error);
        alert('Failed to place order');
      });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center">Your Cart</h2>
      <div className="row">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="col-md-4" key={item.id}>
              <div className="card mb-4">
                <img src={item.image} alt={item.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Price: Rs.{item.price}</p>
                  <button className="btn btn-danger" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="text-center">
        <h3>Total: Rs.{total}</h3>
        <button className="btn btn-success" onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default CartPage;
