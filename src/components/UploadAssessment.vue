<template>
  <div>
    
    <!-- Dropdown to select assessment type -->
    <v-select
      ref="assessmentSelect"
      v-model="selectedAssessment"
      :items="items"
      density="comfortable"
      label="Select Assessment Type"
      variant="outlined"
      class="mt-10"
      :rules="assessmentRules"
      required="true"
    ></v-select>

    <!-- File upload card -->
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
 <!-- Alert Component -->
 <AlertComponent
      v-if="showAlert"
      :alertType="alertType"
      :message="alertMessage"
      :isVisible="showAlert"
      class="m-10"
      @close="showAlert = false"
    />
    <!-- List of uploaded assessments -->
<div v-if="uploadedAssessments.length" class="uploaded-assessments mt-5">
  <h3 class="mb-10 mt-10 ml-10">Uploaded Assessments</h3>
  <v-row dense>
    <v-col
      v-for="(assessment, index) in uploadedAssessments"
      :key="index"
      cols="12"
    >
      <v-card class="pa-3 mb-4 mr-8 ml-8"  outlined>
        <v-card-title class="text-h6">
          Assessment Type: {{ assessment.type }}
        </v-card-title>
        <v-card-text>
          <strong>Uploaded File:</strong> {{ assessment.fileName }} <br />
          <span>Uploaded on: {{ assessment.uploadDate }}</span>
        </v-card-text>
        <v-card-actions class="close-container">
          <v-btn
            variant="text"
            density="compact"
            size="large"
            color="green"
            @click="previewFile(assessment.pdfUrl)"
          >
            Preview Assessment
          </v-btn>
          <v-btn
            variant="text"
            density="compact"
            size="large"
            color="red"
            @click="deleteAssessments(assessment.type)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</div>

    <!-- PDF preview -->
<!-- PDF preview modal -->
<div v-if="currentPdfUrl" class="pdf-modal">
  <div class="pdf-modal-content">
    <v-btn
      variant="text"
      size="large"
      color="red"
      @click="closePreview"
      class="close-btn"
    >
      Close
    </v-btn>
    <iframe :src="currentPdfUrl" width="100%" height="750px"></iframe>
  </div>
</div>
   
  </div>
</template>
  
<script>
import { uploadAssessment, deleteAssessment } from "@/services/AssessmentAPIService";
import AlertComponent from "@/components/AlertComponents.vue";
export default {
  components: {
    AlertComponent,
  },

  data() {
    return {
      items: [
        "Survey",
        "Pre-Course Assessment",
        "Post Course Assessment",
        "Demographic & Psychographic",
      ],
      selectedAssessment: "",
      file: null,
      fileName: "",
      uploadDate: "",
      uploadClicked: false,
      uploadedAssessments: [], // Array to store details of uploaded assessments
      currentPdfUrl: "", // For previewing the selected PDF
      showAlert: false,
      alertType: "success",
      alertMessage: "",
      loading: false,
    };
  },

  computed: {
    assessmentRules() {
    return [
      (value) =>
        !!value || "Please select an assessment type before uploading files.",
    ];
  },
    
  },
  mounted() {
    this.loadAssessmentsFromLocalStorage();
  },
  methods: {
        // Save assessments to local storage
        saveToLocalStorage() {
      localStorage.setItem(
        "uploadedAssessments",
        JSON.stringify(this.uploadedAssessments)
      );
    },

    // Load assessments from local storage
    loadAssessmentsFromLocalStorage() {
      const storedAssessments = localStorage.getItem("uploadedAssessments");
      if (storedAssessments) {
        this.uploadedAssessments = JSON.parse(storedAssessments);
      }
    },
    triggerFileUpload() {
    this.uploadClicked = true; // Set the flag for computed rule reevaluation
    // Validate the v-select manually
    const isValid = this.$refs.assessmentSelect.validate();
    // If validation fails, stop the file upload
    if (!isValid) {
      console.log("Validation failed. Please select an assessment type.");
      return;
    }
    // Proceed with file input click if validation passes
    this.$refs.fileInput.click();
  },
    handleFileUpload(event) {
      const uploadedFile = event.target.files[0];
      if (uploadedFile && this.isExcelFile(uploadedFile)) {
        this.file = uploadedFile;
        this.fileName = `${this.selectedAssessment}_${uploadedFile.name}`;
        this.uploadDate = new Date().toLocaleString();
      } else {
        this.resetFile();
        alert("Please upload a valid Excel file (.xls or .xlsx).");
      }
    },
    isExcelFile(file) {
      const validExtensions = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      return validExtensions.includes(file.type);
    },
    resetFile() {
      this.file = null;
      this.fileName = "";
    },
    async saveFile() {
      if (this.file && this.selectedAssessment) {
        this.loading = true;
        try {
          // Call the API to upload the assessment
          const response = await uploadAssessment(
            this.selectedAssessment,
            this.file
          );

          if(response['status']){
            this.showAlertMessage("success", response['message']);
          // Extract PDF URL from response and add to the list
          this.uploadedAssessments.push({
            type: this.selectedAssessment,
            fileName: this.fileName,
            uploadDate: this.uploadDate,
            pdfUrl: response['pdfUrl'],
          });
            this.saveToLocalStorage()
            this.resetFile(); // Reset file input after successful upload
          }else{
            this.showAlertMessage("error", response['message']);
          }
         
        } catch (error) {
          this.showAlertMessage("error", error);
        } finally {
          this.loading = false;
        }
      } else {
        this.showAlertMessage(
          "warning",
          "Please select an assessment type and upload a file."
        );
      }
    },
        // Delete assessments by type and update local storage
      async deleteAssessments(type) {
        this.loading = true;
        try{
         const response =  await deleteAssessment(type);
         if(response['status']){
        this.showAlertMessage("success", response['message']);
        this.uploadedAssessments = this.uploadedAssessments.filter((assessment) => assessment.type !== type);
        this.saveToLocalStorage();
         }else{
          this.showAlertMessage("error", response['message']);
         }
        }catch(error){
          this.showAlertMessage("error", error);
        }finally {
          this.loading = false;
        }

    },
    showAlertMessage(type, message) {
      this.alertType = type;
      this.alertMessage = message;
      this.showAlert = true;
    },
    previewFile(pdfUrl) {
      this.currentPdfUrl = pdfUrl;
    },
    closePreview() {
    this.currentPdfUrl = "";
  },
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

.pdf-preview canvas {
  max-width: 100%;
  margin: auto;
  display: block;
}

.close-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.pdf-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.pdf-modal-content {
  background: #fff; /* White background for the modal content */
  border-radius: 8px;
  padding: 50px 20px 20px;
  width: 90%;
  max-width: 900px; /* Set a max width for larger screens */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
}
.uploaded-assessments .v-card {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
.uploaded-assessments .v-card {
  transition: transform 0.4s, box-shadow 0.3s;
}

.uploaded-assessments .v-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
.close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 1100;
}
  </style>
  