import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
      // Load demo products if API fails
      setProducts([
        {
          _id: '1',
          name: 'Arduino UNO',
          description: 'Microcontroller board based on the ATmega328P',
          category: 'microcontroller',
          price: 24.99,
          stock: 50,
          image: '📟'
        },
        {
          _id: '2',
          name: 'Ultrasonic Sensor',
          description: 'HC-SR04 Ultrasonic Distance Sensor',
          category: 'sensor',
          price: 3.99,
          stock: 100,
          image: '📡'
        },
        {
          _id: '3',
          name: 'LED Kit',
          description: 'Various colors LED light kit',
          category: 'component',
          price: 4.99,
          stock: 200,
          image: '💡'
        },
        {
          _id: '4',
          name: 'Jumper Wires',
          description: '120pcs Jumper Wires for Breadboard',
          category: 'accessory',
          price: 5.99,
          stock: 150,
          image: '🔌'
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="products-container"><p>Loading products...</p></div>;
  }

  return (
    <div className="products-container">
      <h1>Products</h1>
      {error && <div className="error-message">{error}</div>}
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">{product.image}</div>
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="category">{product.category}</p>
            <p className="price">${product.price}</p>
            <p className="stock">Stock: {product.stock}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
