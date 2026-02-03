# ElectroZone Backend_1

This is the Express.js backend server for the ElectroZone e-commerce platform.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB (local or cloud instance)

### Installation

1. Navigate to the backend_1 directory:
```bash
cd backend_1
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (already provided):
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/electrozone_1
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

### Running the Server

#### Development Mode
```bash
npm run dev
```
This uses nodemon for auto-restart on file changes.

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5001`

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)

#### Orders
- `GET /api/orders` - Get user's orders (protected)
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

### Health Check
- `GET /api/health` - API health status

### Project Structure

```
backend_1/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   └── order.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   └── order.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── password.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

### Technologies Used

- Express.js - Web framework
- Mongoose - MongoDB ORM
- JWT - Authentication
- bcryptjs - Password hashing
- CORS - Cross-Origin Resource Sharing
- dotenv - Environment variables

### CORS Configuration

The server is configured to accept requests from:
- http://localhost:3000
- http://localhost:3001
- http://127.0.0.1:3000
- http://127.0.0.1:3001

### Error Handling

All endpoints include proper error handling and return appropriate HTTP status codes.

### Notes

- MongoDB connection errors are logged but don't crash the server in development
- JWT tokens expire after 7 days
- Passwords are hashed using bcryptjs with 10 salt rounds
