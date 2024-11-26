<template>
    <div>
        
      <v-select
        v-model="selectedAssessment"
        :items="items"
        density="comfortable"
        label="Select Assessment Type"
        variant="outlined"
        class="mt-10"
        :rules="assessmentRules"
        required
      ></v-select>
  
      <div class="file-upload-card">
        <v-btn
          variant="text"
          size="large"
          class="file-upload-btn"
          @click="triggerFileUpload"
        >
          <v-icon top>mdi-file</v-icon>
          Click Here to Upload Files
        </v-btn>
        <input
          type="file"
          ref="fileInput"
          accept=".xlsx, .xls"
          style="display: none"
          @change="handleFileUpload"
        />
        <p>
          Upload a <strong>Excel</strong> table in the format below:
          <br />
          <span>Question | Options | Correct_Answers</span>
        </p>
        <v-btn
          :loading="loading"
          variant="toned"
          density="compact"
          size="Larger"
          :disabled="!file || !selectedAssessment"
          @click="saveFile"
        >
          Save
        </v-btn>
      </div>
  
      <div v-if="fileName" class="file-upload-div">
        <p>
          <strong>Assessment Type:</strong> {{ selectedAssessment }}
          <br />
          <strong>Uploaded File:</strong> {{ fileName }}
          <br />
          <span>Uploaded on {{ uploadDate }}</span>
        </p>
  
        <!-- Preview button -->
        <v-btn
          variant="text"
          density="compact"
          size="Larger"
          style="color: green !important"
          @click="previewFile"
        >
          Preview Assessment
        </v-btn>
        <!-- PDF preview section -->
        <div v-if="pdfUrl" class="pdf-preview">
          <embed :src="pdfUrl" width="100%" height="500px" />
        </div>
      </div>
         <!-- Alert Component -->
    <AlertComponent
      v-if="showAlert"
      :alertType="alertType"
      :message="alertMessage"
      :isVisible="showAlert"
      @close="showAlert = false"
    />
    </div>
  </template>
  
  <script>
//   import XLSX from 'xlsx';
//   import { PDFDocument } from 'pdf-lib';
import { uploadAssessment } from '@/services/AssessmentAPIService';
import AlertComponent from '@/components/AlertComponents.vue';
  
  export default {
    components: {
        AlertComponent
    },
    data() {
      return {
        items: [
          'Survey',
          'Pre-Course Assessment',
          'Post Course Assessment',
          'Demographic & Psychographic',
        ],
        selectedAssessment: '', // Stores selected assessment type
        file: null, // Stores the uploaded file
        fileName: '', // Stores the file name for display
        uploadDate: '', // Stores the upload date for display
        uploadClicked: false, // Flag to track if upload button has been clicked
        pdfUrl: '', // The URL of the generated PDF for preview
        showAlert: false, // Controls visibility of the alert
        alertType: 'success', // Type of the alert (success, info, warning, error)
        alertMessage: '', // Message for the alert
        loading: false, // Controls loading state for the save button
      };
    },
    computed: {
      assessmentRules() {
        return this.uploadClicked && !this.selectedAssessment
          ? [(v) => !!v || 'Please select an assessment type.']
          : []; // No rules if upload button hasn't been clicked
      },
    },
    methods: {
      triggerFileUpload() {
        this.uploadClicked = true;
        if (!this.selectedAssessment) {
          this.$refs.fileInput.blur();
        } else {
          this.$refs.fileInput.click();
        }
      },
      handleFileUpload(event) {
        const uploadedFile = event.target.files[0];
        if (uploadedFile && this.isExcelFile(uploadedFile)) {
          this.file = uploadedFile;
          this.fileName = `${this.selectedAssessment}_${uploadedFile.name}`;
          this.uploadDate = new Date().toLocaleString(); // Save current date/time
          this.pdfUrl = ''; // Reset PDF URL when a new file is uploaded
        } else {
          this.resetFile();
          alert('Please upload a valid Excel file (.xls or .xlsx).');
        }
      },
      isExcelFile(file) {
        const validExtensions = [
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];
        return validExtensions.includes(file.type);
      },
      resetFile() {
        this.file = null;
        this.fileName = '';
      },
      async saveFile() {
      if (this.file && this.selectedAssessment) {
        this.loading = true;
        let response;
        try {
          // Call the API service to upload the assessment
        
      response = await uploadAssessment(this.selectedAssessment, this.file);
          this.showAlertMessage('success', `File "${this.selectedAssessment}" ${response.message}`);
        } catch (error) {
          console.error('Error during upload:', error);
          this.showAlertMessage('error', "Error uploading file, Please try again");
        }finally {
          this.loading = false; // Stop loading spinner
        }
      } else {
        this.showAlertMessage('warning', 'Please select an assessment type and upload a file.');
        this.loading = false;
      }
    },
    showAlertMessage(type, message) {
      this.alertType = type;
      this.alertMessage = message;
      this.showAlert = true;
    },
      async previewFile() {
         if (!this.file) {
    alert('Please upload a file before previewing.');
    return;
  }
}
    },
  };
  </script>
  <style scoped>
  .file-upload-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  .file-upload-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-radius: 8px;
  }

  .file-upload-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #dcd8d8;
    padding: 12px;
    border-radius: 8px;
  }
  
  .file-upload-card p {
    margin-left: 1px;
  }
  .pdf-preview {
    margin-top: 20px;
  }
  </style>
  