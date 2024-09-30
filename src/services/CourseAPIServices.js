// src/services/apiService.js

import axios from 'axios';

// Create an axios instance with the base API URL
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/courses',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Handle regular POST/PUT requests
const apiRequest = (method, url, data) => {
  return apiClient({
    method: method,
    url: url,
    data: data
  });
};

// Helper function for handling file uploads
const uploadFileHelper = (courseId, fileType, file) => {
  const formData = new FormData();
  formData.append(fileType, file);

  return apiClient.post(`${courseId}/${fileType}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Create a new course
export const createCourse = (courseData) => {
  return apiRequest('post', '/', courseData);
};

// Update a course
export const updateCourse = (courseId, courseData) => {
  return apiRequest('put', `/${courseId}`, courseData);
};

// Upload questions
export const uploadQuestions = (courseId, file) => {
  return uploadFileHelper(courseId, 'questions', file);
};

// Upload answers
export const uploadAnswers = (courseId, file) => {
  return uploadFileHelper(courseId, 'answers', file);
};

// Upload media
export const uploadMedia = (courseId, file) => {
  return uploadFileHelper(courseId, 'media', file);
};

// Get all courses
export const getCourses = () => {
  return apiClient.get('/');
};

// Get course by ID
export const getCourseById = (courseId) => {
  return apiClient.get(`/${courseId}`);
};
