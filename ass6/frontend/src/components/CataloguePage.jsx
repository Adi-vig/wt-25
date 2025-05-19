import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CataloguePage() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      category,
      price: parseFloat(price),
      image: image || "https://via.placeholder.com/150"
    };

    axios.post('http://localhost:8080/api/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setName('');
        setCategory('');
        setPrice('');
        setImage('');
        alert('Product added!');
      })
      .catch(error => {
        console.error('Error adding product', error);
        alert('Failed to add product');
      });
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Grocery Catalogue</h2>
        <Link to="/cart" className="btn btn-secondary">Go to Cart</Link>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h4>Add New Product</h4>
          <form onSubmit={handleAddProduct}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-2 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image URL"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>
      </div>

      <div className="row">
        {products.map(product => (
          <div className="col-md-4" key={product.id}>
            <div className="card mb-4 shadow-sm">
              <img src={product.image} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5>{product.name}</h5>
                <p className="mb-1">Category: {product.category}</p>
                <p>Price: ₹{product.price}</p>
                <button className="btn btn-success w-100" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CataloguePage;
