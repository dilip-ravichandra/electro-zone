# ElectroZone - Static HTML Setup Quick Reference

## Overview
- **Frontend:** Static HTML + Vanilla JavaScript (NO React)
- **Backend:** Express.js API on port 5001
- **Server:** Python HTTP Server or Node.js on port 8000
- **Theme:** Cyberpunk with electric blue & neon green

---

## Quick Start (30 seconds)
```bash
# From c:\html\electrozone
launch.bat
```
Then open: `http://localhost:8000/auth.html`

---

## File Structure

| File | Purpose |
|------|---------|
| `auth.html` | Login/Register page |
| `home.html` | Dashboard with products & cart |
| `public/css/*` | Styling |
| `public/js/*` | Utilities |
| `server.js` | Node.js fallback server |

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create user account |
| POST | `/api/auth/login` | Login user |
| GET | `/api/products` | Fetch all products |

**Header Required:** `Authorization: Bearer {token}`

---

## Frontend Workflow

```
auth.html (Login/Register)
        ↓
  Store authToken + username
        ↓
  home.html (Dashboard)
        ↓
  Check authToken exists
        ↓
  Fetch products from /api/products
        ↓
  Display products + cart
```

---

## LocalStorage Keys

| Key | Value | Used By |
|-----|-------|---------|
| `authToken` | JWT token | All authenticated requests |
| `username` | User's name | Display in header |

---

## Colors Used

| Color | Hex | Usage |
|-------|-----|-------|
| Electric Blue | `#00D9FF` | Buttons, highlights |
| Neon Green | `#00FF88` | Accents, status |
| Orange | `#FF6B35` | Secondary CTA |
| Dark Navy | `#0A1929` | Background |

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Backend won't start | `npm install` in backend_1 |
| Port 5001 in use | Change PORT in backend_1/.env |
| Port 8000 in use | Use `python -m http.server 8001` |
| Can't login | Check backend console for errors |
| Products not loading | Verify authToken is stored |
| CSS not loading | Check browser console, ensure paths are correct |

---

## Testing Commands

```bash
# Test Backend API
curl http://localhost:5001/api/health

# Test Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test Get Products (need valid token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5001/api/products
```

---

## Key Features

✅ **Home Page (auth.html):**
- Email/password login
- New user registration
- Form validation
- Password visibility toggle
- Error messages
- Redirect to home.html on success

✅ **Dashboard (home.html):**
- User greeting
- Product listing from API
- Shopping cart system
- Quantity controls
- Logout with confirmation
- Responsive design

✅ **Cart:**
- Add/remove products
- Modify quantities
- Calculate total
- Sliding sidebar animation
- Cart badge counter

---

## Development Tips

1. **Debug Auth Issues:**
   - Open DevTools (F12)
   - Check Storage → LocalStorage for `authToken`
   - Check Console for fetch errors

2. **Debug API Issues:**
   - Check Backend_1 terminal for logs
   - Verify MongoDB is accessible
   - Check `.env` file in backend_1

3. **Reset State:**
   - Clear localStorage: DevTools → Storage → Clear All
   - Logout and login again

4. **Modify Products:**
   - Edit `products-grid` in home.html
   - Or fetch real data from `/api/products`

---

## Deployment Checklist

- [ ] Test register flow
- [ ] Test login flow
- [ ] Test product loading
- [ ] Test cart operations
- [ ] Test logout
- [ ] Test responsive design
- [ ] Test on different browsers
- [ ] Verify no console errors
- [ ] Update CORS origins for production
- [ ] Use environment variables for API URL

---

## Production Notes

For production deployment:

1. **Update API URL:**
   - Replace `http://localhost:5001` with production API URL
   - In auth.html & home.html

2. **Update CORS:**
   - In backend_1 app.js, update origin to production domain

3. **HTTPS:**
   - Use HTTPS for both frontend and backend
   - Update fetch calls to use HTTPS URLs

4. **Authentication:**
   - Consider using HttpOnly cookies instead of localStorage
   - Implement token refresh mechanism
   - Add request timeout handling

5. **Hosting:**
   - Frontend: Static hosting (Netlify, Vercel, S3)
   - Backend: Node.js hosting (Heroku, AWS, DigitalOcean)

---

**Last Updated:** 2026
**Version:** 1.0
**Status:** Ready for Development
