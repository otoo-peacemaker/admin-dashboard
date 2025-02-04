// src/services/assessmentService.js
import axios from 'axios';
// const testUrl='http://localhost:3000';
const prodUrl='https://responder.onrender.com';

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
    const response = await axios.get(`${prodUrl}/responder/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching assessments:', error);
    throw new Error('Error fetching assessments');
  }
};
