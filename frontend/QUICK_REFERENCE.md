# ElectroZone - Quick Reference Guide

## 🔐 Authentication Flow

### Login Process:
```
1. User enters email & password
   ↓
2. POST /api/auth/login → {email, password}
   ↓
3. Server returns: {token, ...}
   ↓
4. Save to localStorage:
   - "authToken" = token
   - "username" = userData.name
   ↓
5. Redirect to home.html
   ↓
6. Home page checks localStorage["authToken"]
   ↓
7. Display username in navbar
```

### Logout Process:
```
1. User clicks dropdown → Logout
   ↓
2. Confirmation modal appears
   ↓
3. User confirms
   ↓
4. Clear localStorage:
   - Remove "authToken"
   - Remove "username"
   ↓
5. Redirect to auth.html
```

---

## 📱 Component Structure

### Home Page (Vanilla JS)
```html
Header
├── Top Bar (Info)
├── Navigation
│   ├── Logo
│   ├── Location Selector
│   ├── Search Bar
│   └── Actions
│       ├── Cart Button
│       └── User Dropdown
│           ├── Username Display ← FIXED
│           └── Logout Menu
├── Hero Section
├── Categories
├── Featured Banner
├── Products Grid
├── Cart Sidebar
├── Logout Modal ← NEW
└── Footer
```

### Home Page (React)
```jsx
<Home>
  ├── <Header>
  ├── <HeroSection>
  ├── <CategoriesGrid>
  ├── <FeaturedBanner>
  ├── <ProductsGrid>
  ├── <CartSidebar>
  ├── <LogoutModal>
  └── <Footer>
```

---

## 💾 localStorage Keys Reference

| Key | Value | Usage |
|-----|-------|-------|
| `authToken` | JWT Token | API requests (Bearer token) |
| `username` | User's Name | Display in navbar |

---

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/login
  Input: {email, password}
  Output: {token, ...}

GET /api/auth/me
  Headers: Authorization: Bearer {token}
  Output: {name, email, ...}

POST /api/auth/register
  Input: {name, email, password}
  Output: {token, ...}
```

### Products
```
GET /api/products
  Output: [{id, name, price, description, ...}]
```

### Orders (Future)
```
POST /api/orders
GET /api/orders/{id}
```

---

## 🎨 Color Scheme (CSS Variables)

```css
--primary-electric: #00D9FF   (Cyan - Main accent)
--primary-deep: #0A1929       (Dark blue - Background)
--primary-navy: #1A2332       (Navy - Header)
--accent-neon: #00FF88        (Green - Success)
--accent-orange: #FF6B35      (Orange - Alert)
--text-primary: #E8EAED       (Light - Text)
--text-secondary: #8B95A5     (Gray - Secondary)
```

---

## 📊 State Management

### Vanilla JS
```javascript
// Global variables
let cart = [...]           // Cart items
let username = "..."       // User name

// Update methods
function updateUsername() { ... }
function updateCart() { ... }
```

### React
```javascript
const [username, setUsername] = useState('');
const [cart, setCart] = useState([]);
const [showCartSidebar, setShowCartSidebar] = useState(false);
const [showLogoutModal, setShowLogoutModal] = useState(false);
```

---

## 🧪 Test Scenarios

### Scenario 1: First Time Login
```
1. Go to auth.html (not logged in)
   ↓
2. Auto-redirect to auth.html ✓
   ↓
3. Fill login form
   ↓
4. Submit
   ↓
5. Redirect to home.html
   ↓
6. Username displays: "John Doe" ✓
   ↓
7. Refresh page
   ↓
8. Still logged in, username shows ✓
```

### Scenario 2: Logout Flow
```
1. Logged in on home.html
   ↓
2. Click user icon → dropdown ✓
   ↓
3. Click "Logout"
   ↓
4. Modal asks confirmation ✓
   ↓
5. Click "Yes, Logout"
   ↓
6. Redirect to auth.html ✓
   ↓
7. Try to visit home.html
   ↓
8. Auto-redirect to auth.html (no token) ✓
```

### Scenario 3: Cart Operations
```
1. On home.html
   ↓
2. Click cart button
   ↓
3. Cart sidebar opens ✓
   ↓
4. Items display with quantity controls ✓
   ↓
5. Click + button
   ↓
6. Quantity increases ✓
   ↓
7. Total recalculates ✓
   ↓
8. Click - button
   ↓
9. Quantity decreases (min 1) ✓
```

---

## 🐛 Debugging

### Username Not Showing?
```javascript
// Check 1: Is token saved?
console.log(localStorage.getItem('authToken')); // Should not be null

// Check 2: Is username saved?
console.log(localStorage.getItem('username')); // Should show name

// Check 3: Check HTML element
console.log(document.getElementById('navUsername')); // Should exist

// Check 4: Browser Network Tab
// Verify auth/me response returns {name: "..."}
```

### Cart Not Updating?
```javascript
// Check 1: Is cart state updating?
console.log(cart); // Should show items

// Check 2: Check quantities
cart.forEach(item => console.log(item.quantity));

// Check 3: Verify total calculation
console.log(getCartTotal()); // Should be > 0
```

---

## 🚀 Performance Tips

1. **Cache API Responses**: Store products list for 5 minutes
2. **Lazy Load Images**: Use `loading="lazy"` on images
3. **Debounce Search**: Wait 300ms after user stops typing
4. **Code Split**: Load cart component on demand (React)

---

## 📚 Files Reference

```
electrozone/
├── frontend/
│   ├── public/
│   │   ├── home.html              (✅ Fixed - Username displays)
│   │   ├── auth.html              (Login page)
│   │   ├── HomeReact.jsx          (⭐ New - React component)
│   │   ├── HomeReact.css          (⭐ New - React styles)
│   │   └── js/
│   │       ├── auth.js            (✅ Fixed - Token keys)
│   │       ├── home.js            (Login logic)
│   │       └── authGuard.js       (Auth checks)
│   └── REACT_SETUP.md             (⭐ New - Setup guide)
└── FIX_SUMMARY.md                 (⭐ New - This summary)
```

---

**Last Updated**: February 1, 2026
**Status**: ✅ Ready for Production
