<template>
  <div class="responder-form">
    <!-- Input Fields -->
    <div class="form-row">
      <div class="form-group">
        <label for="responderId">Responder ID</label>
        <input
          id="responderId"
          type="text"
          v-model="responderId"
          placeholder="Enter Responder ID"
        />
      </div>
      <div class="form-group">
        <label for="preCourseAssessment">Pre-Course Assessment</label>
        <input
          id="preCourseAssessment"
          type="number"
          v-model="preCourseAssessment"
          placeholder="Enter Pre-Course Assessment"
        />
      </div>
      <div class="form-group">
        <label for="postCourseAssessment">Post-Course Assessment</label>
        <input
          id="postCourseAssessment"
          type="number"
          v-model="postCourseAssessment"
          placeholder="Enter Post-Course Assessment"
        />
      </div>
      
    </div>
    <div class="form-group">
        <label for="inPersonTraining">In-Person Training</label>
        <input
          id="inPersonTraining"
          type="number"
          v-model="inPersonTraining"
          placeholder="Enter In-Person Training"
        />
      </div>
    <!-- Generate Code Button -->
    <div class="actions">
      <v-btn
        class="generate-code"
        variant="elevated"
        size="Larger"
        :disabled="!canGenerateCode || isLoading"
        @click="handleGenerateCode"
      >
        Generate Code
      </v-btn>
    </div>

    <!-- List of Generated Codes -->
    <div class="generated-codes">
  <h3 class="mb-10">Generated Codes</h3>
  <v-row v-if="codes.length">
    <v-col v-for="code in codes" :key="code.id" cols="12" sm="6" md="6">
      <v-card class="code-card" outlined>
        <v-card-title class="text-h6">
          <strong>Code:</strong> {{ code.code }}
        </v-card-title>
        <v-card-subtitle>
          <strong>Responder ID:</strong> {{ code.responderId }} <br />
          <strong>Expires At:</strong> {{ new Date(code.expiresAt).toLocaleString() }}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn variant="outlined" size="large" @click="deleteCode(code.code)">Delete</v-btn>
          <v-btn variant="elevated" size="large" @click="resendCode(code.code)">Resend</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <p v-else>No codes available</p>
</div>

  </div>
</template>

<script>
import {
  generateCode,
  getAllGeneratedCodes, deleteAccessCode,
  // resendCode
} from "@/services/AccessCodeAPIService";

import Swal from "sweetalert2";
import toastr from "toastr";
import "toastr/build/toastr.min.css";  

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-bottom-right",
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

export default {
  data() {
    return {
      responderId: "",
      preCourseAssessment: null,
      postCourseAssessment: null,
      inPersonTraining: null,
      codes: [],
      isLoading: false,
    };
  },
  computed: {
    canGenerateCode() {
      return (
        this.responderId &&
        this.preCourseAssessment &&
        this.postCourseAssessment &&
        this.inPersonTraining
      );
    },
  },
  methods: {
    async fetchCodes() {
      try {
        const response = await getAllGeneratedCodes();
        this.codes = response.data; 
      } catch (error) {
        toastr.error(error);
      }
    },
    async handleGenerateCode() {
      this.isLoading = true;
      try {
        const response = await generateCode(
          this.responderId,
          this.preCourseAssessment,
          this.postCourseAssessment,
          this.inPersonTraining
        );
        toastr.success(response.message || 'Code generated successfully');
        this.fetchCodes();
      } catch (error) {
        toastr.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async resendCode(code) {
      if (!code) {
        toastr.error('No code provided');
        return;
      }
      try {
        // const response = await resendCode(code);
        // toastr.success(response.message || 'Code resent successfully');
        toastr.info(`Code: ${code} sending hasn't been implemented yet`)
      } catch (error) {
        toastr.error(error);
      }
    },
    async deleteCode(code) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This code will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#49c157",
        cancelButtonColor: "#B11F1A",
        confirmButtonText: "Yes, delete it!",
        customClass:{
          confirmButton: 'swal-confirm',
          cancelButton: 'swal-cancel'
        }
      });

      if (result.isConfirmed) {
        try {
          await deleteAccessCode(code);
          toastr.success('Code deleted successfully');
          this.fetchCodes();
        } catch (error) {
          toastr.error(error);
        }
      }
    },
  
  },
  mounted() {
    this.fetchCodes();
  },
};
</script>
<style scoped>
.generated-codes {
  padding: 20px;
}

h3.mb-10 {
  font-size: 1.5rem;
  color: #333;
}

.code-card {
  transition: box-shadow 0.3s ease;
}

.code-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.v-card-title {
  font-size: 1.1rem;
}

.v-card-subtitle {
  font-size: 0.9rem;
  color: #555;
}

.v-card-actions {
  justify-content: flex-end;
}

.v-btn {
  margin: 5px;
}
.swal-confirm {
        background-color: #00ba22 !important;
        color: #ffffff;
    }
    
.swal-cancel {
        background-color: #B11F1A !important;
        color: #ffffff;
    }

.swal2-text {
  background-color: #FEFAE3;
  padding: 17px;
  border: 1px solid #F0E1A1;
  display: block;
  margin: 22px;
  text-align: center;
  color: #61534e;
}
.responder-form {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.form-group {
  flex: 1;
  min-width: 200px;
}
.actions {
  margin-top: 1rem;
}
.generated-codes {
  margin-top: 2rem;
}
.code-item {
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 5px;
}
.code-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.delete-btn {
  padding: 8px 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.resend-btn {
  padding: 8px 16px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.form-group {
  display: flex;
  flex-direction: column;
  width: 30%;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.actions {
  margin-bottom: 20px;
}

.generate-code {
  padding: 10px 20px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.generate-code:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.generated-code {
  font-size: 1.2em;
}

.resend-link {
  color: green;
  cursor: pointer;
  text-decoration: underline;
}

.renewal-info {
  font-size: 0.9em;
  color: #555;
}
</style>
