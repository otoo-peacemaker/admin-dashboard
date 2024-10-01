<template>
    <v-container fluid>
      <v-card
        v-for="(course, index) in courses"
        :key="index"
        class="pa-4 mb-5"
        outlined
      >
        <v-card-title class="red white--text">
          Course Info
        </v-card-title>
  
        <v-card-text>
          <div class="d-flex justify-space-between align-center">
            <div>
              <p class="font-weight-bold">Course Title:</p>
              <p>{{ course.title }}</p>
            </div>
            <div>
              <p class="font-weight-bold">Course Length:</p>
              <p>{{ course.length }}</p>
            </div>
            <v-icon @click="editCourse(course, index)" class="edit-icon">mdi-pencil</v-icon>
          </div>
          <div>
            <p class="font-weight-bold">Learning Objective:</p>
            <p>{{ course.learningObjective }}</p>
          </div>
        </v-card-text>
  
        <v-card-actions>
          <v-row justify="space-around" class="mt-3">
            <v-btn
              class="mx-2"
              small
              outlined
              @click="triggerFileUpload('questions', index)"
              :loading="uploading[index]?.questions"
            >
              <v-icon left>mdi-upload</v-icon>
              Questions
            </v-btn>
            <input
              type="file"
              :ref="`questionsInput_${index}`" 
              style="display: none"
              @change="handleFileUpload('questions', index)"
            />
            
            <v-btn
              class="mx-2"
              small
              outlined
              @click="triggerFileUpload('answers', index)"
              :loading="uploading[index]?.answers"
            >
              <v-icon left>mdi-upload</v-icon>
              Answers
            </v-btn>
            <input
              type="file"
              :ref="`answersInput_${index}`"  
              style="display: none"
              @change="handleFileUpload('answers', index)"
            />
  
            <v-btn
              class="mx-2"
              small
              outlined
              @click="triggerFileUpload('media', index)"
              :loading="uploading[index]?.media"
            >
              <v-icon left>mdi-upload</v-icon>
              Media Files
            </v-btn>
            <input
              type="file"
              :ref="`mediaInput_${index}`" 
              style="display: none"
              @change="handleFileUpload('media', index)"
            />
  
            <v-btn
              class="mx-2"
              small
              outlined
              @click="deleteCourse(index)"
              color="red"
            >
              <v-icon left>mdi-delete</v-icon>
              Delete
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
  
      <v-btn
        class="floating-btn"
        color="red"
        @click="addCourse"
        fab
        dark
      >
        <v-icon large>mdi-plus</v-icon>
      </v-btn>
  
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Course</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="editedCourse.title" label="Course Title:" outlined></v-text-field>
            <v-text-field v-model="editedCourse.learningObjective" label="Learning Objective:" outlined></v-text-field>
            <v-text-field v-model="editedCourse.length" label="Course Length:" outlined></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="saveCourse" color="primary" dark>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "UploadCourses",
    data() {
      return {
        dialog: false,
        courses: [],
        editedCourse: {
          title: "",
          learningObjective: "",
          length: "",
        },
        editedIndex: -1,
        uploading: {},
      };
    },
    methods: {
      addCourse() {
        const newCourse = {
          title: "New Course",
          learningObjective: "New Objective",
          length: "New Length",
        };
        this.courses.push(newCourse);
      },
      editCourse(course, index) {
        this.editedCourse = { ...course };
        this.editedIndex = index;
        this.dialog = true;
      },
      saveCourse() {
        if (this.editedIndex !== -1) {
          this.$set(this.courses, this.editedIndex, this.editedCourse);
        }
        this.dialog = false;
      },
      deleteCourse(index) {
        const confirmDelete = confirm("Are you sure you want to delete this course?");
        if (confirmDelete) {
          this.courses.splice(index, 1);
        }
      },
      triggerFileUpload(type, index) {
  const inputRef = `${type}Input_${index}`;
  console.log('Input Ref:', inputRef);
  console.log('Refs:', this.$refs);
  
  const fileInput = this.$refs[inputRef];

  if (fileInput) {
    fileInput.click();
  } else {
    console.error(`File input reference not found for type: ${type}, index: ${index}`);
  }
},
      handleFileUpload(type, index) {
        const files = this.$refs[`${type}Input`].files;
  
        if (files.length > 0) {
          if (!this.uploading[index]) {
            this.$set(this.uploading, index, {});
          }
          this.uploading[index][type] = true;
  
          const formData = new FormData();
          formData.append(type, files[0]);
  
          setTimeout(() => {
            console.log(`Uploaded ${type} for course index ${index}:`, files[0]);
            this.uploading[index][type] = false;
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`);
          }, 2000);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-icon {
    cursor: pointer;
  }
  .floating-btn {
    left: 16px;
    right: 16px;
  }
  </style>
  