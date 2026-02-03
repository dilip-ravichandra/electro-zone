import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (name, email, password, confirmPassword) =>
    apiClient.post('/auth/register', { name, email, password, confirmPassword }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  getCurrentUser: () =>
    apiClient.get('/auth/me'),
};

export const productService = {
  getAllProducts: () =>
    apiClient.get('/products'),
  getProductById: (id) =>
    apiClient.get(`/products/${id}`),
  createProduct: (productData) =>
    apiClient.post('/products', productData),
};

export const orderService = {
  getUserOrders: () =>
    apiClient.get('/orders'),
  createOrder: (products) =>
    apiClient.post('/orders', { products }),
  getOrderById: (id) =>
    apiClient.get(`/orders/${id}`),
};

export default apiClient;
