import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: 'https://your-backend-url/api', // Replace with your backend URL
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
    if (error.response.status === 401) {
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
      const response = await apiClient.post('/auth/login', { email, password });
      const { token } = response.data;
      // Save token to localStorage
      this.saveToken(token);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed. Please try again.';
    }
  },

  async register(email, password, confirmPassword) {
    try {
      const response = await apiClient.post('/auth/register', {
        email,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed. Please try again.';
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

