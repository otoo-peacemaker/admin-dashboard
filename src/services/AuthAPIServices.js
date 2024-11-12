import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: 'https://responder.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    // If token exists, add it to headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Optionally, add a response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    // If the response is successful, return the response
    return response;
  },
  (error) => {
    // Handle token expiration or unauthorized access
    if (error.response.data.status === 401) {
      // Clear token and redirect to login page if token is expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    }

    // Return the error for further handling
    return Promise.reject(error);
  }
);

// Authentication API service
export const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.post('/admin/auth/login', { email, password });
      const { token } = response.data;
      this.saveToken(token);
      return response.data;
    } catch (error) {
      console.log(apiClient.defaults.baseURL); // should log 'https://dispatcher-backend-xgj5.onrender.com'

      const apiError = error.response?.data?.error?.message || 'Login failed. Please try again.';
      throw new Error(apiError);
    }
  },

  async register(username, email, phone, password) {
    try {
      const response = await apiClient.post('/admin/auth/signup', {
        username,
        email,
        phone,
        password,
        role:'Admin'
      });
      return response.data;
    } catch (error) {
      const apiError = error.response?.data?.message || 'Registration failed. Please try again.';
      throw new Error(apiError);
    }
  },

  async logout() {
    try {
      // Perform logout actions, e.g., clear session/token
      localStorage.removeItem('token');
    } catch (error) {
      throw 'Logout failed.';
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token'); // Returns true if token exists
  },

  saveToken(token) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },
};

