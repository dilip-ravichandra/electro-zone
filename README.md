# ElectroZone - Electronic Components E-Commerce Platform

Welcome to **ElectroZone**, a full-stack e-commerce platform for selling electronic components like microcontrollers, sensors, and IoT devices.

## 🚀 Quick Start (NEW!)

### Backend_1 & Frontend_1 (Recommended)

For the latest React-based frontend with full API integration:

```bash
# Windows
launch.bat

# macOS/Linux
bash launch.sh
```

Then open http://localhost:3000 in your browser.

**See [QUICK_START.md](./QUICK_START.md) for detailed instructions.**

## Project Structure

```
electrozone/
├── backend/              # Original Node.js/Express API (port 5000)
├── backend_1/            # NEW Backend with enhanced features (port 5001)
│   ├── src/
│   │   ├── config/       # Database and environment configuration
│   │   ├── models/       # Mongoose schemas (User, Product, Order)
│   │   ├── routes/       # API route handlers
│   │   ├── controllers/  # Business logic
│   │   ├── middleware/   # Auth and error handling
│   │   ├── utils/        # JWT and password utilities
│   │   ├── app.js        # Express app setup
│   │   └── server.js     # Server entry point
│   ├── .env              # Environment variables
│   └── package.json      # Dependencies
│
├── frontend/             # Original HTML/CSS/JS frontend
│   ├── public/
│   │   ├── assets/       # Images and icons
│   │   ├── css/          # Stylesheets
│   │   ├── js/           # JavaScript logic
│   │   ├── auth.html     # Login/Signup page
│   │   ├── index.html    # Home page
│   │   └── product.html  # Product listing
│   └── README.md
│
├── frontend_1/           # NEW React-based frontend (port 3000)
│   ├── src/
│   │   ├── components/   # React components (Auth, Products, etc.)
│   │   ├── pages/        # Page components (Home)
│   │   ├── services/     # API service layer
│   │   ├── App.jsx       # Main App component
│   │   └── index.js      # React entry point
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies
│   └── README.md
│
├── docs/                 # Documentation
│   ├── api.md            # API endpoints reference
│   └── schema.md         # Database schemas
│
├── QUICK_START.md        # Quick start guide for Backend_1 & Frontend_1
├── SETUP_GUIDE.md        # Comprehensive setup guide
├── launch.bat            # Windows launcher script
├── launch.sh             # macOS/Linux launcher script
└── README.md             # This file
```

## Features

### Current Features
- ✅ User authentication (login/signup)
- ✅ JWT token-based authorization
- ✅ Product listing
- ✅ Responsive design with ElectroZone theme
- ✅ Protected routes with auth guard
- ✅ Password hashing with bcryptjs

### Planned Features
- 🔄 Shopping cart functionality
- 🔄 Order management
- 🔄 Product filtering and search
- 🔄 User profiles and wishlist
- 🔄 Admin dashboard
- 🔄 Payment processing

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables
- **JavaScript**: Vanilla JS with async/await
- **Design**: Cyberpunk/Neon theme

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB running locally or connection string
- Modern web browser

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/electrozone
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev  # Development with nodemon
   # or
   npm start    # Production
   ```

### Frontend Setup

1. Open `frontend/public/auth.html` in your browser
2. Or serve with a local HTTP server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. Navigate to `http://localhost:8000/frontend/public/auth.html`

## API Documentation

See [docs/api.md](docs/api.md) for detailed API endpoint documentation.

## Database Schema

See [docs/schema.md](docs/schema.md) for database models and relationships.

## Development Workflow

1. Create a new branch for features: `git checkout -b feature/feature-name`
2. Make your changes
3. Test locally
4. Push and create a pull request

## Environment Variables

### Backend `.env`

```
PORT=5000                                          # Server port
MONGODB_URI=mongodb://localhost:27017/electrozone  # MongoDB connection
JWT_SECRET=your_jwt_secret_key_here                # JWT signing secret
NODE_ENV=development                               # Environment
```

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!

## Contact

For questions or suggestions, please reach out.

---

**Happy coding! 🚀**
