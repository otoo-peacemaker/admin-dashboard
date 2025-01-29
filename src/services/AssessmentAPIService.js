// src/services/assessmentService.js
import axios from 'axios';
const testUrl='http://localhost:3000';
// const prodUrl='https://responder.onrender.com';
const apiClient = axios.create({
  baseURL: testUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
const assessmentEndpoints = {
  'Survey': '/assessments',
  'Pre-Course Assessment': '/assessments',
  'Post Course Assessment': '/assessments',
  'Demographic & Psychographic': '/assessments',
  default: '/assessments',
};


// Function to upload an assessment
export const uploadAssessment = async (name, assessmentType, file) => {
  const endpoint = assessmentEndpoints[assessmentType] || assessmentEndpoints.default;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', assessmentType);
  formData.append('name', name);

  try {
    const response = await apiClient.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {

    console.error('Error uploading assessment:', error?.response?.data || error.message);
    throw new Error(error?.response?.data?.error ||error?.response?.data?.message || 'Error uploading assessment');
  }
};

// Function to update an assessment
export const updateAssessment = async (name, assessmentType, file, assessmentId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', assessmentType);
  formData.append('name', name);

  try {
    const response = await apiClient.put(`/update/${assessmentId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating assessment:', error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || 'Error updating assessment');
  }
};

// Function to get all assessments
export const getAssessments = async () => {
  try {
    const response = await apiClient.get(assessmentEndpoints.default);
    return response.data;
  } catch (error) {
    console.error('Error fetching assessments:', error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || 'Error fetching assessments');
  }
};

// Function to delete an assessment
export const deleteAssessment = async (assessmentType) => {
  try {
    const response = await apiClient.delete(
      `${assessmentEndpoints.default}?type=${encodeURIComponent(assessmentType)}`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting assessment:', error?.response?.data || error.message);
    throw new Error(
      error?.response?.data?.message || 'Error deleting assessment'
    );
  }
};
