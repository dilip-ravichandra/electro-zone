# 🔌 ElectroZone - Electronic Components E-Commerce Platform

## 🚀 Quick Start (30 seconds)

```bash
# From this directory (c:\html\electrozone)
launch.bat
```

Then open your browser:
- **Frontend:** http://localhost:8000/auth.html
- **Backend API:** http://localhost:5001

---

## 📋 Project Overview

ElectroZone is a modern e-commerce platform for electronic components with:

**Frontend:**
- Static HTML + CSS + Vanilla JavaScript (NO build process)
- Beautiful cyberpunk UI with electric blue theme
- Authentication with JWT
- Shopping cart system
- Responsive design (mobile, tablet, desktop)

**Backend:**
- Express.js REST API
- MongoDB database
- JWT authentication
- Secure password hashing

**Deployment:**
- Frontend: Port 8000 (Python or Node.js server)
- Backend: Port 5001 (Express.js)

---

## 📁 Directory Structure

```
electrozone/
├── backend_1/                      # Express.js API
│   ├── src/
│   │   ├── app.js                 # Express setup (CORS configured for port 8000)
│   │   ├── server.js              # Server entry point
│   │   ├── config/                # Database & environment config
│   │   ├── controllers/           # Business logic
│   │   ├── middleware/            # Auth & error middleware
│   │   ├── models/                # MongoDB schemas
│   │   ├── routes/                # API endpoints
│   │   └── utils/                 # JWT & password utilities
│   ├── .env                       # Environment variables (PORT=5001)
│   ├── package.json              # Dependencies
│   └── README.md                 # Backend documentation
│
├── frontend_1/                     # Static HTML Frontend
│   ├── public/
│   │   ├── auth.html              # Login & Register page
│   │   ├── home.html              # Dashboard with products & cart
│   │   ├── css/                   # Stylesheets
│   │   ├── js/                    # Utility scripts
│   │   └── assets/                # Images & icons
│   ├── server.js                  # Node.js HTTP server (fallback)
│   └── package.json              # Optional - for Node server
│
├── docs/                          # Documentation
│   ├── api.md                     # API reference
│   ├── schema.md                  # Database schema
│   └── README.md                  # General documentation
│
├── launch.bat                      # ONE-CLICK LAUNCHER ⭐
├── SETUP_COMPLETE.md             # What was set up & how
├── FRONTEND_SETUP.md             # Frontend detailed guide
├── STATIC_HTML_REFERENCE.md      # Quick reference
├── README.md                     # This file
└── .gitignore                    # Git ignore file
```

---

## 🔧 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** bcryptjs
- **CORS:** Enabled for frontend origins

### Frontend
- **HTML5:** Semantic markup
- **CSS3:** Grid, Flexbox, Animations
- **JavaScript:** Vanilla (No frameworks)
- **Fonts:** Orbitron (headings), Rajdhani (body)
- **Colors:** Cyberpunk theme (electric blue #00D9FF, neon green #00FF88)

---

## 🎮 How to Use

### Option 1: One-Click Launch (Recommended)
```bash
launch.bat
```
This automatically:
- ✅ Installs backend dependencies
- ✅ Starts Backend_1 on port 5001
- ✅ Starts Frontend on port 8000
- ✅ Opens in browser

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend_1
npm install          # First time only
npm run dev          # Runs on port 5001
```

**Terminal 2 - Frontend (Python):**
```bash
cd frontend_1\public
python -m http.server 8000
```

**Terminal 2 - Frontend (Node.js alternative):**
```bash
cd frontend_1
node server.js       # Runs on port 8000
```

---

## 🌐 Accessing the Application

| URL | Purpose |
|-----|---------|
| http://localhost:8000/auth.html | Login/Register |
| http://localhost:8000/home.html | Dashboard |
| http://localhost:5001 | Backend API |
| http://localhost:5001/api/health | Health check |

---

## 📱 Features

### User Authentication
- ✅ User registration with email & password
- ✅ User login with JWT token
- ✅ Password validation (min 8 characters)
- ✅ Secure password hashing (bcryptjs)
- ✅ Protected routes with JWT verification

### Shopping
- ✅ Browse electronic components
- ✅ Add products to cart
- ✅ Modify quantities
- ✅ Remove items
- ✅ View total price
- ✅ Cart persists in session

### User Experience
- ✅ Beautiful cyberpunk UI
- ✅ Responsive design (all devices)
- ✅ Smooth animations
- ✅ Real-time cart updates
- ✅ Error handling & validation
- ✅ User greeting with name

### Developer Features
- ✅ No build process needed
- ✅ Easy to understand code
- ✅ Clear file organization
- ✅ Comprehensive documentation
- ✅ Demo data included
- ✅ Easily deployable

---

## 🔐 Authentication Flow

```
┌──────────────────────────────────────────────┐
│ User opens localhost:8000/auth.html          │
└──────────────────────────────────────────────┘
                      ↓
    User registers OR logs in with credentials
                      ↓
      Backend validates & returns JWT token
                      ↓
┌──────────────────────────────────────────────┐
│ localStorage['authToken'] = JWT              │
│ localStorage['username'] = 'User Name'       │
└──────────────────────────────────────────────┘
                      ↓
    Frontend redirects to localhost:8000/home.html
                      ↓
  home.html checks localStorage['authToken']
                      ↓
        ✅ Exists: Display dashboard
        ❌ Missing: Redirect to auth.html
                      ↓
   All API calls include header:
   Authorization: Bearer {authToken}
                      ↓
┌──────────────────────────────────────────────┐
│ User can browse products and manage cart     │
│ User can logout (clears localStorage)        │
└──────────────────────────────────────────────┘
```

---

## 🛠️ API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me              (requires auth)
```

### Products
```
GET    /api/products             (requires auth)
```

### Orders
```
POST   /api/orders               (requires auth)
GET    /api/orders               (requires auth)
```

### Health Check
```
GET    /api/health               (no auth required)
```

**Authentication Header:**
```
Authorization: Bearer {your_jwt_token}
```

---

## 🎨 UI/UX Design

### Color Scheme (Cyberpunk)
- **Primary:** Electric Blue `#00D9FF`
- **Accent:** Neon Green `#00FF88`
- **Secondary:** Orange `#FF6B35`
- **Background:** Navy `#0A1929`

### Typography
- **Headings:** Orbitron (futuristic)
- **Body:** Rajdhani (monospace)

### Components
- Navigation bar with search & user menu
- Hero section with call-to-action buttons
- Category cards with icons
- Product cards with images & pricing
- Shopping cart sidebar (Blinkit-style)
- Smooth animations & transitions

---

## 🧪 Testing

### Test Registration
1. Go to http://localhost:8000/auth.html
2. Click "Create Account"
3. Fill form with:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `password123`
4. Click "Register"
5. Should redirect to home.html with greeting

### Test Login
1. Go to http://localhost:8000/auth.html
2. Enter email & password from registration
3. Click "Login"
4. Should see dashboard with products

### Test Cart
1. Add products by clicking "Add" button
2. Open cart by clicking cart icon
3. Modify quantities
4. Total should update in real-time

### Test Logout
1. Click user icon in top right
2. Click "Logout"
3. Confirm in modal
4. Should redirect to auth.html

---

## 🐛 Troubleshooting

### "Cannot find module 'express'"
**Solution:** Install backend dependencies
```bash
cd backend_1
npm install
```

### Port 5001 Already in Use
**Solution:** Change port in backend_1/.env
```env
PORT=5002
```
Then update URLs in auth.html & home.html

### Port 8000 Already in Use
**Solution:** Use different port
```bash
cd frontend_1\public
python -m http.server 8001
```

### Backend Connection Error
**Solution:** Check backend is running
```bash
# Test health endpoint
curl http://localhost:5001/api/health
```

### Login Not Working
**Solution:** Check browser console & backend logs
- DevTools → Console for JavaScript errors
- Backend terminal for API errors

### Products Not Loading
**Solution:** Verify you're logged in & have valid token
- Check localStorage in DevTools
- Verify auth token exists
- Check backend logs

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **SETUP_COMPLETE.md** | What was changed & overview |
| **FRONTEND_SETUP.md** | Detailed frontend guide |
| **STATIC_HTML_REFERENCE.md** | Quick reference guide |
| **docs/api.md** | API endpoints documentation |
| **docs/schema.md** | Database schema |
| **backend_1/README.md** | Backend specific docs |
| **frontend_1/README.md** | Frontend specific docs |

---

## 🚀 Deployment

### Frontend (Static HTML)
Can be deployed to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting

**Steps:**
1. Upload `frontend_1/public/` contents
2. Update API URL to production backend
3. Set root to serve `auth.html`

### Backend (Node.js)
Can be deployed to:
- Heroku
- AWS EC2
- DigitalOcean
- Railway
- Render

**Steps:**
1. Install Node.js on server
2. Clone backend_1 folder
3. Run `npm install`
4. Set environment variables (PORT, MONGODB_URI, JWT_SECRET)
5. Run `npm start`

---

## 📋 Production Checklist

- [ ] Update API URLs to production domain
- [ ] Configure CORS for production domain
- [ ] Set up HTTPS for both frontend & backend
- [ ] Update JWT_SECRET to strong value
- [ ] Configure MongoDB connection
- [ ] Set up error logging
- [ ] Enable rate limiting on APIs
- [ ] Add request validation
- [ ] Set up backup strategy for database
- [ ] Configure CDN for static assets
- [ ] Set up monitoring & alerts

---

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review browser console (F12)
3. Check backend logs
4. Verify all services are running
5. Clear browser cache & localStorage

---

## 📄 License

This project is part of the ElectroZone platform.

---

## 🎯 Next Steps

1. **Run the application:**
   ```bash
   launch.bat
   ```

2. **Test the features:**
   - Register a new user
   - Login with credentials
   - Browse products
   - Add to cart
   - Logout

3. **Customize (optional):**
   - Change colors in CSS
   - Add more products in home.html
   - Modify product information
   - Add new pages

4. **Deploy (when ready):**
   - Follow deployment section above
   - Set up production database
   - Configure domain & SSL

---

**Version:** 1.0  
**Status:** ✅ Ready for Development & Testing  
**Last Updated:** 2026  
**Frontend:** Static HTML (No React)  
**Backend:** Express.js on Port 5001  
**Frontend Server:** Port 8000 (Python or Node.js)

---

## 🎉 You're All Set!

Everything is ready to go. Simply run:
```bash
launch.bat
```

Then visit:
```
http://localhost:8000/auth.html
```

**Happy coding! ⚡**
