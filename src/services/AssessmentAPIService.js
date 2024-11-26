// src/services/assessmentService.js
import axios from 'axios';

const token = localStorage.getItem('token'); 
axios.interceptors.request.use((config) => {
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const API_URL = 'https://responder.onrender.com';

// Function to upload an assessment
export const uploadAssessment = async (assessmentType, file) => {
    // Object map for handling different assessment types
    const assessmentEndpoints = {
      'Survey': `${API_URL}/survey`,
      'Pre-Course Assessment': `${API_URL}/assessment`,
      'Post Course Assessment': `${API_URL}/assessment`,
      'Demographic & Psychographic': `${API_URL}/demographics`,
      default: `${API_URL}/default-assessment`, // Optional default endpoint
  };

// Determine the endpoint based on the assessmentType
const endpoint = assessmentEndpoints[assessmentType] || assessmentEndpoints.default;
console.log(endpoint)
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Return response data for success
  } catch (error) {
    console.error('Error uploading assessment:', error);
    throw new Error('Error uploading assessment');
  }
};

// Function to update an assessment
export const updateAssessment = async (assessmentType, file, assessmentId) => {
  const formData = new FormData();
  formData.append('assessmentType', assessmentType);
  formData.append('file', file);

  try {
    const response = await axios.put(`${API_URL}/update/${assessmentId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating assessment:', error);
    throw new Error('Error updating assessment');
  }
};

// Function to get all assessments
export const getAssessments = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching assessments:', error);
    throw new Error('Error fetching assessments');
  }
};

// Function to delete an assessment
export const deleteAssessment = async (assessmentId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${assessmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting assessment:', error);
    throw new Error('Error deleting assessment');
  }
};
