// src/services/assessmentService.js
import axios from 'axios';
const API_URL = 'https://responder.onrender.com';
const token = localStorage.getItem('token'); 
axios.interceptors.request.use((config) => {
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



// Function to get all Responders
export const getResponders= async () => {
  try {
    const response = await axios.get(`${API_URL}/responders/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching assessments:', error);
    throw new Error('Error fetching assessments');
  }
};
