// src/services/AccessCodeAPIService.js
import axios from 'axios';

// Constants
const BASE_URL = 'https://responder.onrender.com'; // Switch to prod URL when deploying
const TOKEN = localStorage.getItem('token');

// Axios Configuration
axios.interceptors.request.use(
  (config) => {
    if (TOKEN) {
      config.headers['Authorization'] = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Utility Function for API Requests
const apiRequest = async (method, endpoint, data = null) => {
  try {
    const response = await axios({ method, url: `${BASE_URL}${endpoint}`, data });
    return response.data;
  } catch (error) {
    console.error(`Error in ${method.toUpperCase()} ${endpoint}:`, error);
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};

// API Methods
export const generateCode = (responderId, pre_course_assessment, post_course_assessment, in_person_training) => {
  const data = { responderId, pre_course_assessment, post_course_assessment, in_person_training };
  return apiRequest('post', '/access-code', data);
};

export const getAllGeneratedCodes = () => {
  return apiRequest('get', '/access-code');
};

export const resendCode = (responderId, access_code) => {
  const data = { responderId, access_code };
  return apiRequest('post', '/access-code/send', data);
};

export const deleteAccessCode = (accessCode) => {
  const data = { accessCode };
  return apiRequest('delete', '/access-code', data);
};