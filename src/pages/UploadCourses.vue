<template>
  <v-container fluid>
    <v-card v-for="(course, index) in courses" :key="index" class="pa-4 mb-5" outlined>
      <v-card-title class="red white--text">Course Info</v-card-title>

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
          <v-btn class="mx-2" small outlined @click="triggerFileUpload(index, 'questions')"
                 :loading="uploading[index]?.questions">
            <v-icon left>mdi-upload</v-icon>
            Questions
          </v-btn>
          <input type="file" :ref="getRefName(index, 'questions')" style="display: none"
                 @change="handleFileUpload(index, 'questions')"/>

          <v-btn class="mx-2" small outlined @click="triggerFileUpload(index, 'answers')"
                 :loading="uploading[index]?.answers">
            <v-icon left>mdi-upload</v-icon>
            Answers
          </v-btn>
          <input type="file" :ref="getRefName(index, 'answers')" style="display: none"
                 @change="handleFileUpload(index, 'answers')"/>

          <v-btn class="mx-2" small outlined @click="triggerFileUpload(index, 'media')"
                 :loading="uploading[index]?.media">
            <v-icon left>mdi-upload</v-icon>
            Media Files
          </v-btn>
          <input type="file" :ref="getRefName(index, 'media')" style="display: none"
                 @change="handleFileUpload(index, 'media')"/>

          <v-btn class="mx-2" small outlined @click="deleteCourse(index)" color="red">
            <v-icon left>mdi-delete</v-icon>
            Delete
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>

    <v-btn class="floating-btn" color="red" @click="addCourse" fab dark>
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
      editedCourse: {title: "", learningObjective: "", length: ""},
      editedIndex: -1,
      uploading: {},
    };
  },
  methods: {
    addCourse() {
      const newCourse = {title: "New Course", learningObjective: "New Objective", length: "New Length"};
      this.courses.push(newCourse);
    },
    editCourse(course, index) {
      this.editedCourse = {...course};
      this.editedIndex = index;
      this.dialog = true;
    },
    saveCourse() {
      if (this.editedIndex !== -1) {
        // Directly update the course at the specified index in Vue 3
        this.courses[this.editedIndex] = {...this.editedCourse};
      }
      this.dialog = false;
    },
    deleteCourse(index) {
      if (confirm("Are you sure you want to delete this course?")) {
        this.courses.splice(index, 1);
      }
    },
    getRefName(index, type) {
      return `${type}Input_${index}`;
    },
    triggerFileUpload(index, type) {
      const refName = this.getRefName(index, type);
      const fileInput = this.$refs[refName];
      if (fileInput && fileInput[0]) fileInput[0].click();
      else console.error(`File input not found for type: ${type} and index: ${index}`);
    },
    handleFileUpload(index, type) {
      const refName = this.getRefName(index, type);
      const fileInput = this.$refs[refName];
      if (fileInput && fileInput[0] && fileInput[0].files.length > 0) {
        const file = fileInput[0].files[0];
        this.uploading = {...this.uploading, [index]: {...this.uploading[index], [type]: true}};

        const formData = new FormData();
        formData.append(type, file);

        setTimeout(() => {
          console.log(`Uploaded ${type} for course index ${index}:`, file);
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
