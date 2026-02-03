import React from 'react';
import './Home.css';

const Home = ({ user }) => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>ElectroZone</h1>
          <p>Your One-Stop Shop for Electronic Components</p>
          {user && <p className="welcome-message">Welcome, {user.name}! 👋</p>}
        </div>
      </header>

      <section className="features">
        <h2>Why Choose ElectroZone?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="icon">⚡</span>
            <h3>Fast Shipping</h3>
            <p>Get your components delivered quickly</p>
          </div>
          <div className="feature-card">
            <span className="icon">💰</span>
            <h3>Best Prices</h3>
            <p>Competitive pricing on all products</p>
          </div>
          <div className="feature-card">
            <span className="icon">🔒</span>
            <h3>Secure Payment</h3>
            <p>Safe and secure checkout process</p>
          </div>
          <div className="feature-card">
            <span className="icon">📦</span>
            <h3>Quality Assured</h3>
            <p>All products are authentic and tested</p>
          </div>
        </div>
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card">
            <span className="icon">📟</span>
            <h3>Microcontrollers</h3>
          </div>
          <div className="category-card">
            <span className="icon">📡</span>
            <h3>Sensors</h3>
          </div>
          <div className="category-card">
            <span className="icon">🔩</span>
            <h3>Components</h3>
          </div>
          <div className="category-card">
            <span className="icon">🔌</span>
            <h3>Accessories</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
