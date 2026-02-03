# Quick Reference - Backend_1 & Frontend_1

## Starting Services

### Windows
```batch
cd c:\html\electrozone
launch.bat
```

### macOS/Linux
```bash
cd /path/to/electrozone
bash launch.sh
```

### Manual Start

**Terminal 1 - Backend_1:**
```bash
cd c:\html\electrozone\backend_1
npm install  # First time only
npm run dev
```

**Terminal 2 - Frontend_1:**
```bash
cd c:\html\electrozone\frontend_1
npm install  # First time only
npm start
```

## URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5001
- **Health Check:** http://localhost:5001/api/health

## Default Test Account

After registration, you can login with:
- Email: test@example.com
- Password: test123456

## File Locations

| Component | Location |
|-----------|----------|
| Backend_1 | `c:\html\electrozone\backend_1\` |
| Frontend_1 | `c:\html\electrozone\frontend_1\` |
| Setup Guide | `c:\html\electrozone\SETUP_GUIDE.md` |
| Backend Docs | `c:\html\electrozone\backend_1\README.md` |
| Frontend Docs | `c:\html\electrozone\frontend_1\README.md` |

## Key Features

✅ User Authentication (Login/Register)
✅ JWT Token-Based Authorization
✅ Product Listing & Filtering
✅ Protected Routes
✅ Responsive React UI
✅ API Error Handling
✅ Demo Data Fallback
✅ CORS Enabled

## Environment Variables

### Backend_1 (.env)

```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/electrozone_1
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

### Frontend_1 (package.json)

```json
"proxy": "http://localhost:5001"
```

## Troubleshooting

### Port Already in Use
```bash
# Backend on different port
# Edit backend_1/.env, change PORT=5001 to PORT=5002

# Frontend on different port
npm start -- --port 3001
```

### MongoDB Connection Error
- The app falls back to demo data automatically
- Install MongoDB or use MongoDB Atlas if needed
- Update MONGODB_URI in backend_1/.env

### CORS/API Connection Issues
1. Ensure Backend_1 is running
2. Check proxy setting in frontend_1/package.json
3. Clear browser cache
4. Restart both services

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product

### Health
- `GET /api/health` - API status

## npm Commands

### Backend_1
```bash
npm install   # Install dependencies
npm run dev   # Start with hot-reload
npm start     # Start production server
```

### Frontend_1
```bash
npm install   # Install dependencies
npm start     # Start dev server
npm build     # Build for production
npm test      # Run tests
```

## Next Steps

1. ✅ Run `launch.bat` (Windows) or `bash launch.sh` (Mac/Linux)
2. ✅ Open http://localhost:3000 in your browser
3. ✅ Register a new account
4. ✅ Login and browse products
5. ✅ Test the complete workflow

## Support Files

- **SETUP_GUIDE.md** - Complete setup and configuration guide
- **backend_1/README.md** - Backend documentation
- **frontend_1/README.md** - Frontend documentation
- **docs/api.md** - API reference (original)
- **docs/schema.md** - Database schema reference

---

Last Updated: February 1, 2026
