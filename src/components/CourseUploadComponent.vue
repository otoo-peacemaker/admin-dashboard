<template>
  <div>
    <!-- Loading Spinner -->
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="primary"
      size="40"
      class="loading-spinner"
    ></v-progress-circular>

    <!-- Alert Message -->
    <v-alert
      v-if="isVisible"
      :value="true"
      :color="alertType"
      :icon="icon"
      variant="outlined"
      @click="handleClick"
    >
      {{ message }}
    </v-alert>

    <!-- Course Form -->
    <div class="course-form">
      <!-- Header -->
      <div class="header">
        <h2>Course Title</h2>
        <div class="course-duration">
          <input v-model="courseDuration" placeholder="Course Duration" />
        </div>
      </div>

      <!-- Course Title and Objectives -->
      <div class="form-group">
        <input v-model="courseTitle" class="input" placeholder="Course Title" />
      </div>

      <div class="form-group">
        <textarea v-model="courseObjectives" class="input" placeholder="Course Objectives"></textarea>
      </div>

      <AlertComponent
        v-if="showAlert"
        :alertType="alertType"
        :message="alertMessage"
        :isVisible="showAlert"
        @close="showAlert = false"
      />

      <!-- Upload and Save Section (same row) -->
      <div class="upload-save-section">
        <v-btn variant="outline" size="Larger" @click="handleFileUpload" :disabled="isLoading">
          Click Here to Upload Files
        </v-btn>
        
        <div class="buttons-right">
          <v-btn variant="outline" size="Larger" @click="updateCourse" :disabled="!isEditing || isLoading">
            Update
          </v-btn>
          <v-btn variant="elevated" size="Larger" @click="saveCourse" :disabled="isLoading">
            Save
          </v-btn>
        </div>
      </div>

      <div class="uploaded-courses">
        <h3 class="mb-10">Uploaded Courses</h3>
        <draggable v-model="courses" :options="{ handle: '.drag-handle' }" @end="onDragEnd">
          <v-container>
    <v-row>
      <v-col
        v-for="(course, index) in courses"
        :key="course.id" cols="12"
    
      >
        <v-card class="course-card" >
          <!-- Header Section -->
          <v-card-title class="course-header d-flex justify-space-between align-center">
            <v-icon class="drag-handle" color="grey darken-1">mdi-drag</v-icon>
            <span class="course-title">{{ index + 1 }}. {{ course.courseTitle }}</span>
            <v-chip class="course-duration" color="primary" size="small">
              {{ course.courseDuration }} mins
            </v-chip>
          </v-card-title>

          <!-- Course Body -->
          <v-card-text class="course-body">
            <p class="course-objectives">{{ course.courseObjectives }}</p>
            
            <!-- Video Preview -->
            <div class="video-preview-container">
              <video controls :src="course.videoFile" class="video-preview">
                Your browser does not support the video tag.
              </video>
            </div>
          </v-card-text>

          <!-- Action Buttons -->
          <v-card-actions class="course-actions">
            <v-btn variant="text" size="large" color="primary" @click="editCourse(index)">
              <v-icon left>mdi-pencil</v-icon> Edit
            </v-btn>
            <v-btn variant="flat" size="medium" color="error" @click="deleteCourse(course.id)">
              <v-icon left>mdi-delete</v-icon> Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
        </draggable>
      </div>
    </div>
  </div>
</template>


<script>
import { uploadCourse, getCourses, reorderCourses, updateCourse, deleteCourse } from '@/services/CourseAPIServices';
import { VueDraggableNext } from 'vue-draggable-next';
import AlertComponent from '@/components/AlertComponents.vue';

export default {
  components: {
    draggable: VueDraggableNext,
    AlertComponent
  },
  data() {
    return {
      videoFileUrl: "https://sfo3.digitaloceanspaces.com/iresponder/courses/df771216-c707-4b6a-a25a-62eda67346a8-compressed.mp4",
      courseTitle: '',
      courseObjectives: '',
      courseDuration: '',
      videoUrl: '',
      uploadedFile: null,
      courses: [], // Array to store courses
      isLoading: false,
      showAlert: false, // Controls visibility of the alert
      alertType: 'success', // Type of the alert (success, info, warning, error)
      alertMessage: '', // Message for the alert
      isEditing: false, // Tracks if the form is in editing mode
      editingCourseId: null // Tracks the ID of the course being edited
    };
  },
  mounted() {
    this.fetchCourses();
  },
  methods: {
    async fetchCourses() {
      this.isLoading = true;
      try {
        const response = await getCourses();
        if (response.status) {
          this.courses = response.data;
          console.log(this.courses)
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        this.isLoading = false;
      }
    },
    handleFileUpload() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'video/*';
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          this.uploadedFile = file;
          this.videoUrl = URL.createObjectURL(file);
        }
      };
      fileInput.click();
    },
    async saveCourse() {
      this.isLoading = true;
      const courseData = {
        courseTitle: this.courseTitle,
        courseObjectives: this.courseObjectives,
        courseDuration: this.courseDuration,
        videoUrl: this.videoUrl,
        videoFile: this.uploadedFile
      };

      try {
        const response = await uploadCourse(courseData, this.uploadedFile);
        if (response.status) {
          this.showAlertMessage('success', `Course saved successfully`);
          this.courses.push(response.data);
          this.resetForm();
        }
      } catch (error) {
        console.error('Error saving course:', error);
        this.showAlertMessage('error', "Error saving course, Please try again");
      } finally {
        this.isLoading = false;
      }
    },
    async updateCourse() {
      if (!this.editingCourseId) return;

      this.isLoading = true;
      const courseData = {
        courseTitle: this.courseTitle,
        courseObjectives: this.courseObjectives,
        courseDuration: this.courseDuration,
        videoUrl: this.videoUrl,
        videoFile: this.uploadedFile
      };

      try {
        const response = await updateCourse(courseData, this.editingCourseId, this.uploadedFile);
        if (response.status) {
          this.showAlertMessage('success', `Course updated successfully`);
          this.fetchCourses(); // Refresh the list after updating
          this.resetForm();
        }
      } catch (error) {
        console.error('Error updating course:', error);
        this.showAlertMessage('error', "Error updating course, Please try again");
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.courseTitle = '';
      this.courseObjectives = '';
      this.courseDuration = '';
      this.videoUrl = '';
      this.uploadedFile = null;
      this.isEditing = false;
      this.editingCourseId = null;
    },
    previewVideo(videoUrl) {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.controls = true;
      video.style.width = '500px';
      video.style.height = '300px';
      video.play();
      document.body.appendChild(video);
    },
    async deleteCourse(courseId) {
      try {
        await deleteCourse(courseId);
        this.courses = this.courses.filter((course) => course.id !== courseId);
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    },
    onDragEnd() {
      const orderedCourses = this.courses.map((course, index) => ({
        id: course.id,
        order: index + 1,
      }));

      const isValid = orderedCourses.every(course => course.id && course.order);
      if (!isValid) {
        this.showAlertMessage('error', 'Invalid course data found during reorder');
        return;
      }

      if (orderedCourses.length === 0) {
        this.showAlertMessage('error', 'No courses available to reorder');
        return;
      }
      this.updateCourseOrder(orderedCourses);
    },
    async updateCourseOrder(updatedCourses) {
      try {
        this.isLoading = true;
        const response = await reorderCourses(updatedCourses);
        if (response.status) {
          this.showAlertMessage('success', 'Course order updated successfully');
        } else {
          this.showAlertMessage('error', 'Failed to update course order');
        }
      } catch (error) {
        console.error('Error updating course order:', error);
        this.showAlertMessage('error', 'Error updating course order');
      } finally {
        this.isLoading = false;
      }
    },
    editCourse(index) {
      const course = this.courses[index];
      this.courseTitle = course.courseTitle;
      this.courseObjectives = course.courseObjectives;
      this.courseDuration = course.courseDuration;
      this.videoUrl = course.videoUrl;
      this.isEditing = true;
      this.editingCourseId = course.id;
      this.uploadedFile = course.videoFile
    },
    showAlertMessage(type, message) {
      this.alertType = type;
      this.alertMessage = message;
      this.showAlert = true;
    },
    
  },
  
};
</script>

<style scoped>
/* Loading spinner styling */
.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Course form styling */
.course-form {
  display: flex;
  flex-direction: column;
  height: fit-content;
  gap: 20px;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.course-duration input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;
  color: black;
}
.course-actions {
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
}

.actions-container {
  position: relative; /* Establish a positioning context */
}

.preview-btn {
  position: absolute;
  top: -50px; /* Adjust this value to control the distance from the Edit/Delete buttons */
  left: 0;
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #adb3ba;
  color: white;
  border: none;
  border-radius: 5px;
}

.edit-delete-container {
  display: flex;
  gap: 20px; /* Space between Edit and Delete buttons */
}

.edit-btn, .delete-btn {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.edit-btn { 
  background-color: #ffc107;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.preview-btn:hover {
  background-color: #0056b3;
}

.edit-btn:hover {
  background-color: #9e8c56;
}

.delete-btn:hover {
  background-color: #c82333;
}

.form-group {
  margin-bottom: 5px;
}

.input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.upload-save-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-btn, .save-btn {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.upload-btn {
  background-color: #007bff;
  color: white;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.upload-btn:hover {
  background-color: #0056b3;
}

.save-btn:hover {
  background-color: #218838;
}

.uploaded-courses {
  margin-top: 20px;
}

.course-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; /* Stack header, body, and actions vertically */
  gap: 10px; /* Space between sections */
  width: 100%; /* Expand to fill parent width */
  height: auto; /* Allow height to adjust to content */
  box-sizing: border-box; /* Include padding in width/height calculations */
}

.course-card {
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }

  .course-header {
    font-weight: bold;
    font-size: 18px;
    padding: 12px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }

  .drag-handle {
    cursor: grab;
  }

  .course-title {
    font-size: 16px;
    font-weight: 600;
  }

  .course-duration {
    font-size: 14px;
    font-weight: 500;
  }

  .course-body {
    padding: 16px;
  }

  .course-objectives {
    font-size: 14px;
    color: #555;
  }

  .video-preview-container {
    margin-top: 10px;
    border-radius: 8px;
    overflow: hidden;
  
  }

  .video-preview {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    object-fit: cover;
    justify-self: flex-end;
  }

  .course-actions {
    display: flex;
    justify-content: flex-end;
    padding: 12px;
  }
}

.course-body {
  margin: 10px 0;
  word-wrap: break-word; /* Ensure long text wraps */
  
}

.course-actions {
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  flex-wrap: wrap; /* Allow buttons to wrap if needed */
  gap: 10px; /* Space between buttons */
}

.actions-right {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  gap: 10px;
}

.upload-save-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.upload-save-section .buttons-right {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.upload-btn, .save-btn, .update-btn {
  padding: 10px 20px;
  cursor: pointer;
}

.update-btn:disabled {
  cursor: not-allowed;
}

.drag-handle {
  font-size: 20px;
  margin-right: 10px;
}

.video-preview-container {
  margin-top: 5px;
  text-align: right;
  width: 100%;
  max-width: 300px;
  justify-self: flex-end;
}

.video-preview {
  width: 100%;
  max-width: 300px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>



