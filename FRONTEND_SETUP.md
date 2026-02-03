# ElectroZone - Static HTML + Backend_1 Setup

## Quick Start

### 1. **Launch Everything**
```bash
# From c:\html\electrozone directory
launch.bat
```

This will:
- Start Backend_1 API on **http://localhost:5001**
- Start Frontend on **http://localhost:8000**
- Automatically open auth.html for login/register

### 2. **Manual Start (Alternative)**

**Terminal 1 - Backend:**
```bash
cd c:\html\electrozone\backend_1
npm run dev
```

**Terminal 2 - Frontend:**

Option A (Python):
```bash
cd c:\html\electrozone\frontend_1\public
python -m http.server 8000
```

Option B (Node.js):
```bash
cd c:\html\electrozone\frontend_1
node server.js
```

---

## Project Structure

```
electrozone/
├── backend_1/                 # Express.js API Server (Port 5001)
│   ├── src/
│   │   ├── app.js            # Express app setup
│   │   ├── server.js         # Main entry point
│   │   ├── config/
│   │   │   ├── db.js         # MongoDB config
│   │   │   └── env.js        # Environment variables
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth & error middleware
│   │   ├── models/           # Database schemas
│   │   ├── routes/           # API endpoints
│   │   └── utils/            # JWT & password utils
│   ├── .env                  # Backend config
│   └── package.json
│
├── frontend_1/               # Static HTML Frontend
│   ├── public/
│   │   ├── auth.html         # Login/Register page
│   │   ├── home.html         # Dashboard with products
│   │   ├── css/
│   │   ├── js/
│   │   └── assets/
│   ├── server.js             # Node.js HTTP server (fallback)
│   └── package.json
│
└── launch.bat                # All-in-one launcher

```

---

## API Endpoints

All endpoints require `Authorization: Bearer {token}` header except for auth endpoints.

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/me` - Get current user (protected)

### Products
- **GET** `/api/products` - Fetch all products (protected)

### Orders
- **POST** `/api/orders` - Create order (protected)
- **GET** `/api/orders` - Get user orders (protected)

---

## Frontend Pages

### 1. **auth.html** - Authentication Page
- Beautiful cyberpunk UI
- Login form with email & password
- Registration form with validation
- Password toggle visibility
- All API calls to `http://localhost:5001/api/auth/*`
- Stores token as `authToken` and username as `username` in localStorage

### 2. **home.html** - Dashboard
- User greeting with name from localStorage
- Product listing (fetches from Backend_1 API)
- Shopping cart with add/remove functionality
- User dropdown menu with logout
- Logout confirmation modal
- Automatic redirect to auth.html if not authenticated

### 3. **Cart System**
- Sliding cart sidebar (Blinkit-style)
- Cart badge showing item count
- Quantity controls
- Total price calculation
- Smooth animations

---

## Authentication Flow

```
1. User opens http://localhost:8000/auth.html
   ↓
2. User registers/logs in
   ↓
3. Backend validates and returns JWT token
   ↓
4. Frontend stores:
   - authToken (JWT)
   - username (display name)
   ↓
5. Frontend redirects to home.html
   ↓
6. home.html checks for authToken
   - If exists: Display dashboard & fetch products
   - If missing: Redirect back to auth.html
   ↓
7. All API calls include: Authorization: Bearer {authToken}
```

---

## Styling & Theme

**Color Scheme (Cyberpunk):**
- Primary Electric: `#00D9FF` (cyan)
- Accent Neon: `#00FF88` (green)
- Accent Orange: `#FF6B35` (red-orange)
- Primary Deep: `#0A1929` (dark navy)
- Primary Navy: `#1A2332` (navy)
- Text Primary: `#E8EAED` (light)
- Text Secondary: `#8B95A5` (medium gray)

**Fonts:**
- Headings: `Orbitron` (futuristic sans-serif)
- Body: `Rajdhani` (monospace)

---

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/electrozone
JWT_SECRET=your_jwt_secret_key
PORT=5001
NODE_ENV=development
```

### Frontend
No .env file needed. All configuration is in HTML files:
- API Base: `http://localhost:5001/api`
- Frontend Base: `http://localhost:8000`

---

## Features

✅ **Frontend:**
- Fully responsive design (mobile, tablet, desktop)
- Beautiful cyberpunk UI/UX
- Cart management (add, remove, quantity)
- User authentication
- Product browsing from backend
- Smooth animations & transitions

✅ **Backend:**
- User registration & login with JWT
- Password hashing with bcryptjs
- MongoDB integration
- CORS enabled for localhost
- Error handling middleware
- Protected routes

✅ **Deployment Ready:**
- No build process needed (static HTML)
- Python or Node.js server options
- Can be deployed to any static host
- API can be deployed separately

---

## Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution:** Backend dependencies not installed
```bash
cd backend_1
npm install
```

### Issue: Port 5001 already in use
**Solution:** Modify `.env` in `backend_1/`
```
PORT=5002
```
Then update API URLs in auth.html & home.html

### Issue: Port 8000 already in use
**Solution:** Change port in launch.bat or use:
```bash
cd frontend_1\public
python -m http.server 8001
```

### Issue: Backend not responding
**Solution:** Check Backend_1 terminal for errors, ensure MongoDB is accessible

### Issue: Products not loading
**Solution:** Ensure you're logged in (check browser console for auth errors)

---

## Testing Checklist

- [ ] Launch backend_1 (port 5001 should show API running)
- [ ] Launch frontend (port 8000 should show auth.html)
- [ ] Register new user on auth.html
- [ ] Login with registered credentials
- [ ] Verify redirected to home.html
- [ ] Verify username displays in header
- [ ] Add products to cart
- [ ] Open cart sidebar
- [ ] Modify cart quantities
- [ ] Click logout and confirm modal
- [ ] Verify redirected to auth.html

---

## Technology Stack

**Backend:**
- Node.js + Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Fetch API for HTTP requests
- LocalStorage for client-side state
- CSS Grid & Flexbox
- CSS Animations & Transitions

---

## Notes

- No build process needed for frontend (pure static HTML/CSS/JS)
- All API calls use `fetch()` with proper error handling
- Responsive design works on all screen sizes
- CORS is enabled on backend for localhost
- JWT tokens stored in localStorage (secure for development, use HttpOnly cookies for production)

---

**Created:** 2026
**Version:** 1.0
**Status:** Ready for Development & Testing
