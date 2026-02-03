import React, { useState, useEffect } from 'react';
import './HomeReact.css';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Home() {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication and load user
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const storedUsername = localStorage.getItem('username');

      if (!token) {
        window.location.href = '/public/auth.html';
        return;
      }

      if (storedUsername) {
        setUsername(storedUsername);
      }

      // Try to fetch user from API
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUsername(userData.name);
          localStorage.setItem('username', userData.name);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  // Initialize cart from localStorage
  useEffect(() => {
    const initialCart = [
      { id: 1, name: 'Arduino Uno R3', price: 599, quantity: 1, icon: '🔌', specs: 'ATmega328P • USB Interface' },
      { id: 2, name: 'ESP32 DevKit V1', price: 449, quantity: 1, icon: '📡', specs: 'WiFi + Bluetooth • Dual Core' },
      { id: 3, name: 'DHT22 Sensor', price: 189, quantity: 1, icon: '🌡️', specs: 'Temperature & Humidity' }
    ];
    setCart(initialCart);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.href = '/public/auth.html';
  };

  const handleAddToCart = (productId) => {
    alert(`Added product ${productId} to cart`);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      {/* HEADER */}
      <header className="header">
        <div className="top-bar">
          ⚡ Lightning Fast Delivery • Components in 30 Minutes • Free Shipping Above ₹500
        </div>
        <nav className="nav-container">
          <div className="logo">ElectroZone</div>

          <div className="search-location-wrapper">
            <div className="location-selector">
              <span className="location-icon">📍</span>
              <div className="location-text">
                <div className="location-label">Deliver to</div>
                <div className="location-value">Bengaluru 560001</div>
              </div>
              <span style={{ color: 'var(--text-secondary)' }}>▼</span>
            </div>

            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search for Arduino, ESP32, Sensors, ICs..."
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="nav-actions">
            <button
              className="nav-button"
              onClick={() => setShowCartSidebar(!showCartSidebar)}
            >
              <span className="nav-button-icon">🛒</span>
              <span className="nav-button-label">Cart</span>
              <span className="cart-badge">{getTotalItems()}</span>
            </button>

            <div className="user-dropdown">
              <button
                className="nav-button user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="nav-button-icon">👤</span>
                <span className="nav-button-label">{username || 'User'}</span>
                <span className="dropdown-arrow">▾</span>
              </button>

              {showUserMenu && (
                <div className="dropdown-menu show">
                  <div
                    className="dropdown-item"
                    onClick={() => setShowLogoutModal(true)}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Electronic Components<br />
            Delivered Fast
          </h1>
          <p className="hero-subtitle">
            <span>Arduino</span> • <span>ESP32</span> • <span>Sensors</span> •{' '}
            <span>ICs</span> • <span>Modules</span> • <span>Tools</span>
          </p>
          <div className="hero-cta">
            <button className="cta-button cta-primary">Shop Components</button>
            <button className="cta-button cta-secondary">
              Explore Categories
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <a href="#" className="view-all">
            View All →
          </a>
        </div>

        <div className="categories-grid">
          {[
            { icon: '🔌', name: 'Arduino & Boards', count: '120+ items' },
            { icon: '📡', name: 'ESP32 / ESP8266', count: '85+ items' },
            { icon: '🌡️', name: 'Sensors', count: '200+ items' },
            { icon: '⚙️', name: 'ICs & Chips', count: '350+ items' },
            { icon: '🔧', name: 'Modules', count: '180+ items' },
            { icon: '🔋', name: 'Power & Batteries', count: '95+ items' },
            { icon: '🔨', name: 'Tools & Accessories', count: '140+ items' },
          ].map((category, idx) => (
            <div key={idx} className={`category-card animate-in animate-delay-${idx + 1}`}>
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
              <div className="category-count">{category.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED BANNER */}
      <section className="section">
        <div className="featured-banner">
          <div className="featured-content">
            <div className="featured-text">
              <h2>New Arrivals: Raspberry Pi 5</h2>
              <p>Faster processing, better connectivity, enhanced graphics</p>
              <button className="cta-button cta-primary">Explore Now</button>
            </div>
            <div style={{ fontSize: '8rem', opacity: 0.3, color: 'var(--primary-electric)' }}>
              🔌
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Popular Components</h2>
          <a href="#" className="view-all">
            View All →
          </a>
        </div>

        <div className="products-grid">
          {[
            {
              id: 1,
              name: 'Arduino Uno R3',
              specs: 'ATmega328P • 14 Digital I/O • USB Interface',
              price: 599,
              icon: '🔌',
              delivery: '30 min',
            },
            {
              id: 2,
              name: 'ESP32 DevKit V1',
              specs: 'WiFi + Bluetooth • Dual Core • 240 MHz',
              price: 449,
              icon: '📡',
              delivery: '30 min',
            },
            {
              id: 3,
              name: 'DHT22 Sensor',
              specs: 'Temperature & Humidity • ±0.5°C Accuracy',
              price: 189,
              icon: '🌡️',
              delivery: '45 min',
            },
            {
              id: 4,
              name: 'L298N Motor Driver',
              specs: 'Dual H-Bridge • 2A Per Channel • 5-35V',
              price: 129,
              icon: '⚙️',
              delivery: '30 min',
            },
            {
              id: 5,
              name: 'HC-05 Bluetooth Module',
              specs: 'Class 2 • 10m Range • UART Interface',
              price: 249,
              icon: '🔧',
              delivery: '30 min',
            },
            {
              id: 6,
              name: '18650 Battery Pack',
              specs: '3.7V 2600mAh • Rechargeable • Li-ion',
              price: 299,
              icon: '🔋',
              delivery: '45 min',
            },
            {
              id: 7,
              name: 'WS2812B LED Strip',
              specs: 'RGB • Addressable • 60 LEDs/m • 1 Meter',
              price: 349,
              icon: '💡',
              delivery: '30 min',
            },
            {
              id: 8,
              name: 'HC-SR04 Ultrasonic',
              specs: 'Distance Sensor • 2-400cm Range • 15mA',
              price: 89,
              icon: '📏',
              delivery: '30 min',
            },
          ].map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <div className="delivery-badge">{product.delivery}</div>
                <div className="product-placeholder">{product.icon}</div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-specs">{product.specs}</p>
                <div className="product-footer">
                  <div className="product-price">
                    <span className="price-currency">₹</span>
                    {product.price}
                  </div>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CART SIDEBAR */}
      {showCartSidebar && (
        <>
          <div
            className="cart-overlay active"
            onClick={() => setShowCartSidebar(false)}
          />
          <div className="cart-sidebar active">
            <div className="cart-header">
              <h2>🛒 My Cart</h2>
              <button
                className="cart-close"
                onClick={() => setShowCartSidebar(false)}
              >
                ✕
              </button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">🛒</div>
                  <h3>Your cart is empty</h3>
                  <p>Add some components to get started</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">{item.icon}</div>
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-specs">{item.specs}</div>
                      <div className="cart-item-footer">
                        <div className="cart-item-price">₹{item.price}</div>
                        <div className="cart-quantity">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            −
                          </button>
                          <div className="quantity-display">{item.quantity}</div>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span className="cart-total-label">Total Amount</span>
                <span className="cart-total-amount">₹{getCartTotal()}</span>
              </div>
              <button className="cart-checkout">Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <>
          <div
            className="modal-overlay show"
            onClick={() => setShowLogoutModal(false)}
          />
          <div className="modal">
            <h3>Are you sure you want to logout?</h3>
            <div className="modal-actions">
              <button
                className="btn-yes"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
              <button
                className="btn-no"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About ElectroZone</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Shipping Info</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              <li><a href="#">Arduino</a></li>
              <li><a href="#">Raspberry Pi</a></li>
              <li><a href="#">Sensors</a></li>
              <li><a href="#">Development Boards</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect</h3>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 ElectroZone. Built for makers, by makers. ⚡
        </div>
      </footer>
    </div>
  );
}
