# ElectroZone Database Schema

## User Schema

```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, minlength: 6, selected: false),
  createdAt: Date (default: Date.now)
}
```

**Indexes**: 
- Unique index on `email`

**Methods**:
- `comparePassword(password)`: Compares plain password with hashed password

---

## Product Schema

```javascript
{
  name: String (required),
  description: String (required),
  category: String (enum: ['microcontroller', 'sensor', 'component', 'accessory'], required),
  price: Number (required, min: 0),
  stock: Number (required, min: 0, default: 0),
  image: String (default: null),
  specifications: Object (default: {}),
  createdAt: Date (default: Date.now)
}
```

**Categories**:
- `microcontroller`: ESP32, Arduino, STM32, etc.
- `sensor`: Temperature, pressure, motion, etc.
- `component`: Resistors, capacitors, LEDs, etc.
- `accessory`: Breadboards, wires, cables, etc.

---

## Order Schema (To be implemented)

```javascript
{
  userId: ObjectId (ref: User, required),
  items: [
    {
      productId: ObjectId (ref: Product),
      quantity: Number,
      price: Number
    }
  ],
  totalPrice: Number (required),
  status: String (enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending'),
  shippingAddress: String,
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

---

## Relationships

- **User** → **Order**: One-to-Many (one user can have many orders)
- **Order** → **Product**: Many-to-Many through OrderItems (one order can have many products)

---

## Indexes for Performance

### User Collection
- `email`: Unique index for email lookups

### Product Collection
- `category`: Index for filtering by category
- `name`: Index for product search

### Order Collection (when implemented)
- `userId`: Index for user's orders query
- `status`: Index for status filtering
- `createdAt`: Index for date range queries
