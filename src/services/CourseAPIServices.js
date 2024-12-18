// src/services/courseService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://responder.onrender.com', 
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

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

const API_URL = 'https://responder.onrender.com';

// Function to upload a course
export const uploadCourse = async (courseData, videoFile) => {
  const formData = new FormData();
  formData.append('courseTitle', courseData.courseTitle);
  formData.append('courseObjectives', courseData.courseObjectives);
  formData.append('courseDuration', courseData.courseDuration);
  formData.append('videoUrl', courseData.videoUrl);
  formData.append('videoFile', videoFile); // Video file to upload

  try {
    const response = await apiClient.post(`${API_URL}/course`, formData);
    return response.data; // Return response data for success
  } catch (error) {
    console.error('Error uploading course:', error);
    throw new Error('Error uploading course');
  }
};

// Function to update a course
export const updateCourse = async (courseData, courseId, videoFile) => {
  const formData = new FormData();
  formData.append('courseTitle', courseData.courseTitle);
  formData.append('courseObjectives', courseData.courseObjectives);
  formData.append('courseDuration', courseData.courseDuration);
  formData.append('videoUrl', courseData.videoUrl);
  formData.append('videoFile', videoFile); // Video file to update

  try {
    const response = await apiClient.put(`${API_URL}/course/${courseId}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw new Error('Error updating course');
  }
};

// Function to get all courses
export const getCourses = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/course/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Error fetching courses');
  }
};


// Function to get all courses
export const reorderCourses = async (updatedCourses) => {
  try {
    const response = await apiClient.put(
      `${API_URL}/course/order`, 
      { orderedCourses: updatedCourses }, // Send JSON object
      {
        headers: {
          'Content-Type': 'application/json', 
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to update course order in database:', error);
    throw new Error('Failed to update course order in database');
  }
};

// Function to get a specific course by ID
export const getCourseById = async (courseId) => {
  try {
    const response = await apiClient.get(`${API_URL}/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw new Error('Error fetching course');
  }
};

// Function to delete a course
export const deleteCourse = async (courseId) => {
  try {
    const response = await apiClient.delete(`${API_URL}/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw new Error('Error deleting course');
  }
};
