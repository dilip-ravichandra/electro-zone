# ElectroZone Frontend

Frontend for the ElectroZone electronic components e-commerce platform.

## Directory Structure

```
frontend/
├── public/
│   ├── assets/
│   │   ├── images/     # Product and page images
│   │   └── icons/      # SVG and icon files
│   ├── css/
│   │   └── auth.css    # Global authentication and base styles
│   ├── js/
│   │   ├── auth.js     # Login/signup logic
│   │   ├── home.js     # Home page functionality
│   │   └── authGuard.js # Token verification and route protection
│   ├── auth.html       # Login and signup page
│   ├── index.html      # Home page
│   └── product.html    # Product listing page
└── README.md           # This file
```

## Pages

- **auth.html**: Combined login and signup page with form switching
- **index.html**: Home page showing products (protected route)
- **product.html**: Dedicated product listing page with filtering (protected route)

## Getting Started

1. Ensure the backend is running on `http://localhost:5000`
2. Open `auth.html` in your browser
3. Create an account or login
4. Browse products on the home page

## Features

- User authentication with JWT tokens
- Protected routes with auth guard
- Product listing and display
- Responsive design with ElectroZone theme
- Cart functionality (to be implemented)

## Development

- All CSS is centralized in `css/auth.css`
- JavaScript files handle specific page logic
- Auth token is stored in localStorage
- API calls use Bearer token authentication
