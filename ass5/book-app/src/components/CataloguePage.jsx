import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CataloguePage() {
  // State to store the form inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
  
  // State to store the book list
  const [books, setBooks] = useState([]);

  // Fetch books on page load
  useEffect(() => {
    axios.get('http://localhost:8080/api/books')  // Replace with your backend API
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books', error);
      });
  }, []);

  // Handle form submission to add a new book
  const handleAddBook = (e) => {
    e.preventDefault();
    
    const newBook = {
      title,
      author,
      genre,
      price,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB6tHAS_MJGNOTPPFc4pjVeZ9_AcfFMAUaNA&s",
    };

    axios.post('http://localhost:8080/api/books', newBook)  // Replace with your backend API
      .then(response => {
        // On success, clear form and fetch updated book list
        setTitle('');
        setAuthor('');
        setGenre('');
        setPrice('');
        setImage('');
        alert('Book added successfully!');
        setBooks([...books, response.data]);  // Add new book to the list
      })
      .catch(error => {
        console.error('Error adding book', error);
        alert('Error adding book!');
      });
  };


  const addToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(book);
    alert('Book added to cart!');
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <div className="container">
        <h1>Book Store</h1>
        <div className="d-flex justify-content-between align-items-center my-4">
  <h2 className="me-3">Catalogue</h2> {/* Add margin to the right for spacing */}
  <Link to="/cart" className="btn btn-secondary w-50">Go to Cart</Link>
</div>

      
      {/* Add Book Form */}
      <div className="card my-4">
        <div className="card-body">
          <h3>Add New Book</h3>
          <form onSubmit={handleAddBook}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <input
                type="text"
                id="author"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="genre" className="form-label">Genre</label>
              <input
                type="text"
                id="genre"
                className="form-control"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                id="price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image URL</label>
              <input
                type="text"
                id="image"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Add Book</button>
          </form>
        </div>
      </div>

      {/* List of Books */}
      <div className="container py-5">
      <h2 className="text-center">Available Books   </h2>
      
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4" key={book.id}>
            <div className="card mb-4">
              <img src={book.image} alt={book.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Price: Rs.{book.price}</p>
                <button className="btn btn-primary" onClick={() => addToCart(book)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
     
    </div>
    </div>
  );
}

export default CataloguePage;
