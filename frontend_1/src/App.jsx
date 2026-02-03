import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Home from './pages/Home';
import Products from './components/Products';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="logo">
            ⚡ ElectroZone
          </Link>
          <div className="nav-links">
            {user ? (
              <>
                <Link to="/products">Products</Link>
                <span className="user-info">Hi, {user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth">Login / Register</Link>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/auth"
            element={
              user ? <Navigate to="/" replace /> : <Auth onLoginSuccess={handleLoginSuccess} />
            }
          />
          <Route
            path="/products"
            element={
              user ? <Products /> : <Navigate to="/auth" replace />
            }
          />
        </Routes>

        <footer className="footer">
          <p>&copy; 2024 ElectroZone. All rights reserved. | Backend_1 & Frontend_1</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
