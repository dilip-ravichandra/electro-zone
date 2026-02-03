# 🏗️ ElectroZone System Architecture

## System Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ELECTROZONE PLATFORM                              │
└─────────────────────────────────────────────────────────────────────────────┘

                          ┌──────────────────────────┐
                          │      BROWSER/USER        │
                          │  http://localhost:8000   │
                          └──────────────────────────┘
                                      │
                                      │ HTTPS Request
                                      ▼
                    ┌──────────────────────────────────┐
                    │   FRONTEND SERVER (Port 8000)    │
                    │  Static HTML/CSS/JavaScript      │
                    │                                  │
                    ├──────────────────────────────────┤
                    │  auth.html                       │
                    │  ├─ Login Form                   │
                    │  └─ Register Form                │
                    │                                  │
                    │  home.html                       │
                    │  ├─ User Dashboard              │
                    │  ├─ Product Listing             │
                    │  └─ Shopping Cart               │
                    │                                  │
                    │  public/css/                     │
                    │  public/js/                      │
                    │  public/assets/                  │
                    └──────────────────────────────────┘
                                      │
                                      │ API Calls
                                      │ (fetch with JWT token)
                                      ▼
                    ┌──────────────────────────────────┐
                    │   BACKEND API SERVER             │
                    │   (Express.js Port 5001)         │
                    │                                  │
                    ├──────────────────────────────────┤
                    │  Routes:                         │
                    │  /api/auth/                      │
                    │  /api/products/                  │
                    │  /api/orders/                    │
                    │                                  │
                    ├──────────────────────────────────┤
                    │  Controllers:                    │
                    │  ├─ Auth Controller              │
                    │  ├─ Product Controller           │
                    │  └─ Order Controller             │
                    │                                  │
                    ├──────────────────────────────────┤
                    │  Middleware:                     │
                    │  ├─ JWT Auth                     │
                    │  ├─ CORS (includes 8000)         │
                    │  └─ Error Handler                │
                    │                                  │
                    ├──────────────────────────────────┤
                    │  Utils:                          │
                    │  ├─ JWT Generation               │
                    │  └─ Password Hashing             │
                    └──────────────────────────────────┘
                                      │
                                      │ Database Queries
                                      ▼
                    ┌──────────────────────────────────┐
                    │   MONGODB DATABASE               │
                    │                                  │
                    ├──────────────────────────────────┤
                    │  Collections:                    │
                    │  ├─ users (User schema)          │
                    │  ├─ products (Product schema)    │
                    │  └─ orders (Order schema)        │
                    └──────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

```
USER INTERACTION FLOW:
━━━━━━━━━━━━━━━━━━━━

1. User Opens Browser
   │
   ├─→ localhost:8000/auth.html
   │
   └─→ Page loads with login/register forms


2. User Registers
   │
   ├─→ Fills registration form
   │   (name, email, password)
   │
   ├─→ Form validation on frontend
   │
   ├─→ POST /api/auth/register
   │   {
   │     "name": "John Doe",
   │     "email": "john@example.com",
   │     "password": "hashed_password"
   │   }
   │
   ├─→ Backend validates & hashes password
   │
   ├─→ Saves to MongoDB.users
   │
   └─→ Returns JWT token


3. User Login (OR after registration)
   │
   ├─→ POST /api/auth/login
   │   {
   │     "email": "john@example.com",
   │     "password": "password123"
   │   }
   │
   ├─→ Backend validates credentials
   │
   ├─→ Generates JWT token
   │
   ├─→ Frontend stores token:
   │   {
   │     "authToken": "eyJhbGc...",
   │     "username": "John Doe"
   │   }
   │
   └─→ Redirects to home.html


4. Dashboard Load
   │
   ├─→ home.html checks localStorage
   │   IF authToken exists:
   │   │
   │   ├─→ Display dashboard ✅
   │   │
   │   ├─→ GET /api/products
   │   │   (Header: Authorization: Bearer {token})
   │   │
   │   ├─→ Backend validates JWT
   │   │
   │   ├─→ Fetches from MongoDB.products
   │   │
   │   └─→ Returns product list
   │
   └─→ IF authToken missing:
       └─→ Redirect to auth.html ❌


5. User Adds Product to Cart
   │
   ├─→ Click "Add" button
   │
   ├─→ JavaScript adds to cart array
   │
   ├─→ Renders updated cart UI
   │
   ├─→ Updates cart badge (item count)
   │
   └─→ All in browser (no API call needed)


6. User Logout
   │
   ├─→ Click logout button
   │
   ├─→ Show confirmation modal
   │
   ├─→ Clear localStorage keys:
   │   {
   │     authToken: removed,
   │     username: removed
   │   }
   │
   ├─→ Redirect to auth.html
   │
   └─→ Ready for next user
```

---

## 🔐 Authentication Token Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    JWT TOKEN LIFECYCLE                           │
└──────────────────────────────────────────────────────────────────┘

1. USER REGISTRATION/LOGIN
   ┌─────────────────────────┐
   │ Frontend auth.html      │
   │ POST /api/auth/login    │
   │ {email, password}       │
   └────────────┬────────────┘
                │
                ▼
   ┌─────────────────────────────────────┐
   │ Backend auth.controller.js          │
   │ ├─ Find user in DB                  │
   │ ├─ Compare passwords with bcrypt    │
   │ ├─ Generate JWT token (jwt.utils)   │
   │ └─ Return token + user info         │
   └────────────┬────────────────────────┘
                │
                ▼
   ┌──────────────────────────────────────┐
   │ Frontend stores in localStorage:    │
   │                                      │
   │ localStorage['authToken'] =          │
   │   eyJhbGciOiJIUzI1NiIsInR5cCI...    │
   │                                      │
   │ localStorage['username'] =           │
   │   "John Doe"                         │
   └────────────┬─────────────────────────┘
                │
                ▼
2. AUTHENTICATED API REQUESTS
   ┌─────────────────────────┐
   │ Frontend JavaScript     │
   │ GET /api/products       │
   │ Header: {               │
   │   Authorization:        │
   │   Bearer {authToken}    │
   │ }                       │
   └────────────┬────────────┘
                │
                ▼
   ┌──────────────────────────────────────┐
   │ Backend auth.middleware              │
   │ ├─ Extract token from header         │
   │ ├─ Verify token signature            │
   │ ├─ Check expiration                  │
   │ └─ Attach user to request            │
   └────────────┬─────────────────────────┘
                │
                ▼
   ┌──────────────────────────────────────┐
   │ Route handler executes               │
   │ ├─ req.user available                │
   │ ├─ Fetch from database               │
   │ └─ Return data                       │
   └────────────┬─────────────────────────┘
                │
                ▼
   ┌──────────────────────────────────────┐
   │ Frontend receives response           │
   │ ├─ Parse JSON                        │
   │ ├─ Update UI with data               │
   │ └─ Show to user                      │
   └──────────────────────────────────────┘

3. LOGOUT
   ┌──────────────────────────────────────┐
   │ User clicks logout                   │
   │ ├─ Confirm in modal                  │
   │ ├─ Clear localStorage keys           │
   │ ├─ Future requests lack Bearer token │
   │ └─ Redirect to auth.html             │
   └──────────────────────────────────────┘
```

---

## 📱 Frontend Architecture

```
FRONTEND_1/
│
├─ public/
│  │
│  ├─ auth.html
│  │  │
│  │  ├─ HTML Structure
│  │  │  ├─ Top Bar (announcement)
│  │  │  ├─ Navigation (logo, location, search)
│  │  │  ├─ Auth Forms
│  │  │  │  ├─ Login Form
│  │  │  │  └─ Register Form
│  │  │  └─ Footer
│  │  │
│  │  ├─ CSS Styling
│  │  │  ├─ Cyberpunk colors
│  │  │  ├─ Animations
│  │  │  └─ Responsive layout
│  │  │
│  │  └─ JavaScript Logic
│  │     ├─ Form validation
│  │     ├─ API calls (fetch)
│  │     ├─ localStorage management
│  │     └─ Error handling
│  │
│  ├─ home.html
│  │  │
│  │  ├─ HTML Structure
│  │  │  ├─ Header (navbar + user menu)
│  │  │  ├─ Hero section
│  │  │  ├─ Categories grid
│  │  │  ├─ Products grid
│  │  │  ├─ Featured banner
│  │  │  ├─ Cart sidebar
│  │  │  └─ Footer
│  │  │
│  │  ├─ CSS Styling
│  │  │  ├─ Grid layouts
│  │  │  ├─ Animations
│  │  │  ├─ Cart sidebar
│  │  │  └─ Responsive design
│  │  │
│  │  └─ JavaScript Logic
│  │     ├─ Auth check
│  │     ├─ Product loading (demo + API)
│  │     ├─ Cart management
│  │     ├─ User menu
│  │     ├─ Logout
│  │     └─ Animations
│  │
│  ├─ css/
│  │  ├─ auth.css
│  │  └─ HomeReact.css
│  │
│  ├─ js/
│  │  ├─ auth.js
│  │  └─ home.js
│  │
│  └─ assets/
│     ├─ icons/
│     ├─ images/
│     └─ ...
│
└─ server.js
   ├─ Express HTTP server
   └─ Serves static files (fallback)
```

---

## 🖥️ Backend Architecture

```
BACKEND_1/
│
├─ src/
│  │
│  ├─ server.js (Entry Point)
│  │  └─ Starts Express on port 5001
│  │
│  ├─ app.js (Express Config)
│  │  ├─ CORS setup (includes port 8000)
│  │  ├─ Middleware stack
│  │  ├─ Route mounting
│  │  └─ Error handling
│  │
│  ├─ config/
│  │  ├─ db.js (MongoDB connection)
│  │  └─ env.js (Environment variables)
│  │
│  ├─ routes/
│  │  ├─ auth.routes.js
│  │  │  ├─ POST /register
│  │  │  ├─ POST /login
│  │  │  └─ GET /me (protected)
│  │  │
│  │  ├─ product.routes.js
│  │  │  └─ GET / (protected)
│  │  │
│  │  └─ order.routes.js
│  │     ├─ POST / (protected)
│  │     └─ GET / (protected)
│  │
│  ├─ controllers/
│  │  ├─ auth.controller.js
│  │  │  ├─ register()
│  │  │  ├─ login()
│  │  │  └─ getMe()
│  │  │
│  │  ├─ product.controller.js
│  │  │  └─ getProducts()
│  │  │
│  │  └─ order.controller.js
│  │     ├─ createOrder()
│  │     └─ getOrders()
│  │
│  ├─ middleware/
│  │  ├─ auth.middleware.js
│  │  │  └─ Verifies JWT token
│  │  │
│  │  └─ error.middleware.js
│  │     └─ Global error handler
│  │
│  ├─ models/
│  │  ├─ User.js (Mongoose schema)
│  │  │  ├─ name, email, password
│  │  │  └─ timestamps
│  │  │
│  │  ├─ Product.js
│  │  │  ├─ name, description, price
│  │  │  └─ stock
│  │  │
│  │  └─ Order.js
│  │     ├─ userId, products
│  │     └─ total, status
│  │
│  └─ utils/
│     ├─ jwt.js (Token generation & verification)
│     └─ password.js (Hashing & comparison)
│
├─ .env (Environment variables)
│  └─ PORT=5001, MONGODB_URI, JWT_SECRET
│
└─ package.json (Dependencies)
   ├─ express, mongoose, jwt
   └─ bcryptjs, cors, dotenv
```

---

## 🗄️ Database Schema

```
MONGODB DATABASE: electrozone
│
├─ Collection: users
│  │
│  └─ Document Schema:
│     {
│       _id: ObjectId,
│       name: String,
│       email: String (unique),
│       password: String (hashed),
│       createdAt: Date,
│       updatedAt: Date
│     }
│
├─ Collection: products
│  │
│  └─ Document Schema:
│     {
│       _id: ObjectId,
│       name: String,
│       description: String,
│       price: Number,
│       category: String,
│       stock: Number,
│       icon: String (emoji),
│       createdAt: Date
│     }
│
└─ Collection: orders
   │
   └─ Document Schema:
      {
        _id: ObjectId,
        userId: ObjectId (ref: User),
        items: [
          {
            productId: ObjectId,
            quantity: Number,
            price: Number
          }
        ],
        totalAmount: Number,
        status: String,
        createdAt: Date,
        updatedAt: Date
      }
```

---

## 🔄 Request/Response Flow Example

```
EXAMPLE: User Adds Product to Cart
─────────────────────────────────

1. Frontend (JavaScript)
   ┌─ User clicks "Add" button on product
   └─ Cart array updated in memory
     {
       id: 1,
       name: 'Arduino Uno',
       price: 599,
       quantity: 1,
       icon: '🔌'
     }

2. Frontend (No API Call)
   ┌─ Update cart sidebar UI
   ├─ Recalculate total
   ├─ Update cart badge
   └─ Show success animation
   
   (Cart stored in JavaScript array, not database)


EXAMPLE: User Submits Order
──────────────────────────

1. Frontend (JavaScript)
   ├─ Prepare cart data
   └─ POST /api/orders
      Headers: {
        Authorization: Bearer {token},
        Content-Type: application/json
      }
      Body: {
        items: [
          {productId: 1, quantity: 1, price: 599},
          {productId: 2, quantity: 1, price: 449}
        ],
        totalAmount: 1048
      }

2. Backend (Express)
   ├─ auth.middleware validates JWT
   ├─ order.controller.createOrder()
   ├─ Save to MongoDB
   └─ Return: {
        _id: ObjectId,
        userId: ObjectId,
        items: [...],
        totalAmount: 1048,
        status: 'pending'
      }

3. Frontend (JavaScript)
   ├─ Parse response
   ├─ Show success message
   ├─ Clear cart
   └─ Redirect to orders page
```

---

## 🎯 Component Interaction Map

```
                  ┌─────────────────┐
                  │  auth.html      │
                  │  (Login/Signup) │
                  └────────┬────────┘
                           │
                           │ Successful Auth
                           ▼
         ┌─────────────────────────────────────┐
         │  localStorage                       │
         │  ├─ authToken (JWT)                 │
         │  └─ username (Display Name)         │
         └────────────┬────────────────────────┘
                      │
                      │ Check exists
                      ▼
              ┌───────────────────┐
              │  home.html        │
              │  (Dashboard)      │
              │                   │
              ├───────────────────┤
              │ ├─ Header         │
              │ │  ├─ Nav Bar     │
              │ │  ├─ Search      │
              │ │  └─ User Menu   │
              │ │     └─ Logout   │
              │ │                 │
              │ ├─ Products Grid  │
              │ │  └─ Add to Cart │
              │ │                 │
              │ ├─ Cart Sidebar   │
              │ │  ├─ Items List  │
              │ │  ├─ Qty Ctrl    │
              │ │  └─ Total       │
              │ │                 │
              │ └─ Footer         │
              └───────────────────┘
                      ▲
                      │ fetch()
                      │ (with JWT)
                      │
            ┌─────────────────────┐
            │  Backend API Port:  │
            │  5001               │
            │                     │
            │ ├─ /auth/login      │
            │ ├─ /auth/register   │
            │ ├─ /products        │
            │ └─ /orders          │
            └─────────────────────┘
                      ▲
                      │
                      ▼
            ┌─────────────────────┐
            │  MongoDB Database   │
            │                     │
            │ ├─ users            │
            │ ├─ products         │
            │ └─ orders           │
            └─────────────────────┘
```

---

## 📡 Network Communication

```
Client (Browser)
     │ HTTP GET /auth.html
     ├─────────────────────────────────► Frontend Server (8000)
     │ [Serve static HTML]
     ├◄─────────────────────────────────
     │
     │ HTTP POST /api/auth/login
     │ (JSON: {email, password})
     ├─────────────────────────────────► Backend Server (5001)
     │ [JWT Token + User Info]
     ├◄─────────────────────────────────
     │
     │ HTTP GET /api/products
     │ (Header: Authorization: Bearer {token})
     ├─────────────────────────────────► Backend Server (5001)
     │                                    ├──────────────────► MongoDB
     │                                    │◄──────────────────
     │ [Product List JSON]
     ├◄─────────────────────────────────
     │
     ▼
  Render UI + Update DOM
```

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Secure authentication with JWT
- ✅ Scalable design
- ✅ Easy to maintain & extend
- ✅ No coupling between frontend & backend (can deploy independently)
