# ElectroZone API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication Routes (`/auth`)

#### Register User
- **POST** `/auth/register`
- **Body**: 
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- **Response**: 
  ```json
  {
    "message": "User registered successfully",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### Login User
- **POST** `/auth/login`
- **Body**: 
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: Same as register

#### Get Current User (Protected)
- **GET** `/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: 
  ```json
  {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-31T00:00:00Z"
  }
  ```

### Product Routes (`/products`)

#### Get All Products
- **GET** `/products`
- **Response**: 
  ```json
  [
    {
      "_id": "product_id",
      "name": "ESP32 Microcontroller",
      "description": "Powerful IoT microcontroller",
      "category": "microcontroller",
      "price": 15.99,
      "stock": 50,
      "image": "url_to_image",
      "specifications": {}
    }
  ]
  ```

#### Get Product by ID
- **GET** `/products/:id`
- **Response**: Single product object

#### Create Product (Admin)
- **POST** `/products`
- **Body**: 
  ```json
  {
    "name": "ESP32",
    "description": "IoT Microcontroller",
    "category": "microcontroller",
    "price": 15.99,
    "stock": 50,
    "specifications": {}
  }
  ```

### Order Routes (`/orders`) - To be implemented

#### Get User Orders (Protected)
- **GET** `/orders`

#### Create Order (Protected)
- **POST** `/orders`

#### Get Order Details (Protected)
- **GET** `/orders/:id`

## Error Responses

All errors follow this format:
```json
{
  "message": "Error message here",
  "error": "Detailed error information"
}
```

## Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error
