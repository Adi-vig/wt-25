import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const placeOrder = () => {
    const payload = {
      userId: 1, // Replace with actual user ID
      items: cart.map(p => ({ productId: p.id, quantity: 1 }))
    };
    axios.post('http://localhost:8080/api/orders', payload)
      .then(() => {
        alert('Order placed!');
        setCart([]);
        localStorage.removeItem('cart');
        navigate('/catalogue');
      })
      .catch(err => {
        console.error('Order error:', err);
        alert('Failed to place order.');
      });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Your Grocery Cart</h2>
      <div className="row">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="col-md-4" key={item.id}>
              <div className="card mb-4">
                <img src={item.image} alt={item.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p>Price: ₹{item.price}</p>
                  <button className="btn btn-danger" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="text-center">
        <h4>Total: ₹{total}</h4>
        <button className="btn btn-success" onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default CartPage;
