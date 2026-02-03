# ElectroZone Frontend_1 (React)

This is a React-based frontend for the ElectroZone e-commerce platform.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Navigate to the frontend_1 directory:
```bash
cd frontend_1
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

1. Ensure the backend_1 is running on port 5001
2. Start the React development server:
```bash
npm start
```

The application will open at `http://localhost:3000` and connect to `http://localhost:5001/api`

### Features

- User Authentication (Login/Register)
- Product Listing
- Responsive Design
- Protected Routes
- API Integration with Backend_1

### Project Structure

```
frontend_1/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth.jsx
│   │   ├── Auth.css
│   │   ├── Products.jsx
│   │   └── Products.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

### API Endpoints Used

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.
