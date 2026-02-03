# ElectroZone - Backend_1 & Frontend_1 Setup Guide

## Overview

This guide will help you set up and launch the new Backend_1 and Frontend_1 for the ElectroZone e-commerce platform.

### Directory Structure

```
electrozone/
├── backend/                 # Original backend (port 5000)
├── backend_1/               # New backend (port 5001)
├── frontend/                # Original frontend (HTML/CSS/JS)
├── frontend_1/              # New frontend (React)
└── docs/
```

## Prerequisites

- Node.js (v14 or higher)
- npm
- MongoDB (optional - app will run with demo data if not available)

## Quick Start

### Step 1: Install Dependencies

#### Backend_1
```bash
cd c:\html\electrozone\backend_1
npm install
```

#### Frontend_1
```bash
cd c:\html\electrozone\frontend_1
npm install
```

### Step 2: Start Backend_1

```bash
cd c:\html\electrozone\backend_1
npm run dev
```

The backend will start on `http://localhost:5001`

Check if it's running: `http://localhost:5001/api/health`

### Step 3: Start Frontend_1 (in a new terminal)

```bash
cd c:\html\electrozone\frontend_1
npm start
```

The frontend will automatically open at `http://localhost:3000`

## Features

### Backend_1 API Endpoints

#### Authentication
- **POST** `/api/auth/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```

- **POST** `/api/auth/login` - Login
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **GET** `/api/auth/me` - Get current user (requires token)

#### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create product

#### Orders
- **GET** `/api/orders` - Get user's orders (protected)
- **POST** `/api/orders` - Create order (protected)
- **GET** `/api/orders/:id` - Get order by ID (protected)

### Frontend_1 Features

- **Home Page** - Landing page with features and categories
- **Authentication** - Login/Register with email and password
- **Products Page** - View all available products
- **Protected Routes** - Only logged-in users can access products
- **Responsive Design** - Works on desktop and mobile devices

## Testing the Application

### Test User (Create New)

1. Go to `http://localhost:3000`
2. Click "Login / Register"
3. Switch to Register tab
4. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123456
   - Confirm Password: test123456
5. Click Register

### Test Login

1. Go to `http://localhost:3000`
2. Click "Login / Register"
3. Enter credentials:
   - Email: test@example.com
   - Password: test123456
4. Click Login

### View Products

1. After logging in, click "Products" in the navbar
2. You'll see a list of demo products (if MongoDB is not available)
3. The app will attempt to load from the API if MongoDB is running

## Configuration

### Backend_1 (.env)

```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/electrozone_1
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

### Frontend_1 (package.json proxy)

The proxy is set to `http://localhost:5001` to forward API calls.

## Troubleshooting

### Backend Port Already in Use

If port 5001 is already in use, modify the PORT in `.env`:
```
PORT=5002
```

Then update the proxy in frontend_1's `package.json`:
```json
"proxy": "http://localhost:5002"
```

### Frontend Not Connecting to Backend

1. Ensure Backend_1 is running on port 5001
2. Check CORS is enabled (already configured)
3. Clear browser cache and restart both servers

### MongoDB Connection Issues

The app includes fallback demo data, so it will work without MongoDB. To use MongoDB:

1. Install MongoDB locally or use MongoDB Atlas
2. Update MONGODB_URI in backend_1/.env
3. Restart the backend server

### React Port Already in Use

```bash
npm start -- --port 3001
```

## Development Commands

### Backend_1

```bash
npm run dev        # Start with nodemon (auto-reload)
npm start          # Start production server
npm test           # Run tests
```

### Frontend_1

```bash
npm start          # Start development server
npm build          # Build for production
npm test           # Run tests
npm eject          # Eject from create-react-app (irreversible)
```

## Production Deployment

### Backend_1

1. Build: `npm run build`
2. Set `NODE_ENV=production` in .env
3. Change JWT_SECRET to a secure value
4. Run: `npm start`

### Frontend_1

1. Build: `npm run build`
2. Deploy the `build` folder to a web server
3. Configure environment for production API URL

## File Structure Details

### Backend_1 Structure

- `src/config/` - Database and environment configuration
- `src/models/` - Mongoose schemas (User, Product, Order)
- `src/routes/` - API route definitions
- `src/controllers/` - Business logic for routes
- `src/middleware/` - Authentication and error handling
- `src/utils/` - JWT and password utilities

### Frontend_1 Structure

- `src/components/` - Reusable React components
- `src/pages/` - Full page components
- `src/services/` - API communication service
- `public/` - Static assets and HTML

## API Response Examples

### Login Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123456",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Products Response
```json
[
  {
    "_id": "1",
    "name": "Arduino UNO",
    "description": "Microcontroller board",
    "category": "microcontroller",
    "price": 24.99,
    "stock": 50
  }
]
```

## Support

For issues or questions, refer to the individual README files:
- [Backend_1 README](./backend_1/README.md)
- [Frontend_1 README](./frontend_1/README.md)

## License

ISC

## Author

ElectroZone Team

---

**Last Updated**: February 1, 2026
