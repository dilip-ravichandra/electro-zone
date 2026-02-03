# Testing & Verification Guide - Backend_1 & Frontend_1

## Pre-Launch Checklist

Before starting the services, ensure you have:

- ✅ Node.js installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ Port 5001 available (or configure alternate)
- ✅ Port 3000 available (or configure alternate)

## Step 1: Install Dependencies

### Backend_1
```powershell
cd C:\html\electrozone\backend_1
npm install
```

Expected: Installation completes without errors, creates `node_modules` folder

### Frontend_1
```powershell
cd C:\html\electrozone\frontend_1
npm install
```

Expected: Installation completes without errors, creates `node_modules` folder

## Step 2: Start Backend_1

```powershell
cd C:\html\electrozone\backend_1
npm run dev
```

Expected output:
```
> electrozone-backend-1@1.0.0 dev
> nodemon src/server.js

[nodemon] starting `node src/server.js`
Backend_1 Server running on port 5001
```

### Test Backend Health

Open in browser or use curl:
```
http://localhost:5001/api/health
```

Expected response:
```json
{
  "status": "ElectroZone Backend_1 API is running"
}
```

## Step 3: Start Frontend_1 (in new terminal)

```powershell
cd C:\html\electrozone\frontend_1
npm start
```

Expected output:
```
Compiled successfully!

You can now view electrozone-frontend-1 in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

Browser should automatically open to `http://localhost:3000`

## Step 4: Test User Registration

1. On the home page, click **Login / Register**
2. Click on **Register** tab
3. Fill in the form:
   - Name: `Test User`
   - Email: `test@electrozone.com`
   - Password: `Test@12345`
   - Confirm Password: `Test@12345`
4. Click **Register**

Expected:
- ✅ Form validates input
- ✅ Backend receives request
- ✅ User is created in database (or demo data)
- ✅ JWT token is generated
- ✅ Redirect to home page with user info
- ✅ Browser console shows no errors

## Step 5: Test User Login

1. From the home page navbar, click **Login / Register**
2. Click on **Login** tab
3. Enter credentials:
   - Email: `test@electrozone.com`
   - Password: `Test@12345`
4. Click **Login**

Expected:
- ✅ Login form submits
- ✅ Backend validates credentials
- ✅ JWT token is returned
- ✅ Token stored in localStorage
- ✅ Redirect to home page
- ✅ Navbar shows "Hi, Test User"

## Step 6: Test Products Page

1. After login, click **Products** in navbar
2. Wait for products to load

Expected:
- ✅ Page loads successfully
- ✅ Products display in grid
- ✅ Each product shows:
  - Product emoji icon
  - Product name
  - Description
  - Category badge
  - Price
  - Stock quantity
  - Add to Cart button

If MongoDB is not running, demo products should load.

## Step 7: Test Protected Routes

1. Click **Logout** button
2. Click on **Products** link in navbar
3. Verify you're redirected to login page

Expected:
- ✅ Protected routes require login
- ✅ Logout clears tokens and user data
- ✅ Cannot access products without authentication

## Step 8: Test API Endpoints

### Using Postman or curl

#### Register
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test",
    "email": "apitest@example.com",
    "password": "Test123456",
    "confirmPassword": "Test123456"
  }'
```

Expected response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "API Test",
    "email": "apitest@example.com"
  }
}
```

#### Login
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@example.com",
    "password": "Test123456"
  }'
```

#### Get All Products
```bash
curl http://localhost:5001/api/products
```

Expected: Array of products

#### Get Current User (Protected)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5001/api/auth/me
```

## Step 9: Browser Console Testing

1. Open browser DevTools (F12)
2. Go to Console tab
3. Check for errors

Expected:
- ✅ No 403/401 errors during normal usage
- ✅ No CORS errors
- ✅ No undefined variable warnings
- ✅ API calls complete successfully

### Check Network Tab

1. Go to Network tab
2. Perform login
3. Check requests

Expected:
- ✅ POST to `/api/auth/login` returns 200
- ✅ Response includes token
- ✅ Token stored in localStorage

### Check Application/Storage Tab

1. Go to Application > Local Storage
2. Click on `http://localhost:3000`

Expected keys:
- ✅ `token` - JWT token
- ✅ `user` - User JSON object

## Step 10: Test Error Handling

### Invalid Login
1. Enter wrong password
2. Click Login

Expected:
- ✅ Error message displays
- ✅ Backend returns 401 error
- ✅ User is not logged in

### Duplicate Email Registration
1. Try registering with same email twice

Expected:
- ✅ Second attempt fails
- ✅ Error message: "User already exists with this email"

### Invalid Form Data
1. Try registering without filling all fields

Expected:
- ✅ Form validation shows errors
- ✅ Submit is disabled until valid

## Performance Testing

### Measure Page Load Time
1. Open DevTools Network tab
2. Go to Products page (when logged in)
3. Check load time

Expected: < 2 seconds for page load

### Monitor API Response Times
1. Check Network tab for `/api/products` call
2. Note response time

Expected: < 500ms

## Database Testing (If MongoDB Running)

### Verify User Created in MongoDB
```bash
mongo
use electrozone_1
db.users.find()
```

Expected: User documents with hashed passwords

### Verify Products Saved
```bash
db.products.find()
```

## Cleanup Testing

1. **Browser Cache**: Clear all data
2. **Logout**: Click logout button
3. **Refresh**: Reload page

Expected:
- ✅ User is logged out
- ✅ Redirected to login page
- ✅ localStorage is cleared

## Troubleshooting Issues

### Issue: CORS Error
**Solution**: Ensure Backend_1 is running and CORS is enabled
```javascript
// Already configured in backend_1/src/app.js
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
```

### Issue: Backend Connection Refused
**Solution**: 
1. Check if backend is running: `http://localhost:5001/api/health`
2. Verify port 5001 is not blocked
3. Check firewall settings

### Issue: Products Not Loading
**Solution**:
1. Check Network tab for failed requests
2. Verify MongoDB connection (if using real DB)
3. App should fall back to demo data

### Issue: Tokens Not Persisting
**Solution**:
1. Check localStorage is enabled in browser
2. Clear browser cache
3. Check browser privacy settings

## Performance Metrics to Monitor

- Page load time: < 2 seconds
- API response time: < 500ms
- Time to Interactive (TTI): < 3 seconds
- Bundle size (Frontend): < 100KB after gzip

## Security Testing

- ✅ JWT tokens expire after 7 days
- ✅ Passwords are hashed with bcryptjs (10 rounds)
- ✅ Protected routes require authentication
- ✅ CORS restricts to localhost domains
- ✅ Environment variables not exposed in frontend

## Final Verification Checklist

- ✅ Backend_1 runs on port 5001
- ✅ Frontend_1 runs on port 3000
- ✅ User registration works
- ✅ User login works
- ✅ Products page loads
- ✅ Protected routes work
- ✅ API endpoints respond correctly
- ✅ No console errors
- ✅ No CORS errors
- ✅ Navigation works correctly
- ✅ Logout clears data
- ✅ Error messages display properly

## Success Criteria

✅ All tests pass → Ready for deployment

---

**Last Updated**: February 1, 2026
