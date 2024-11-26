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
          type="text"
          v-model="preCourseAssessment"
          placeholder="Enter Pre-Course Assessment"
        />
      </div>
      <div class="form-group">
        <label for="postCourseAssessment">Post-Course Assessment</label>
        <input
          id="postCourseAssessment"
          type="text"
          v-model="postCourseAssessment"
          placeholder="Enter Post-Course Assessment"
        />
      </div>
    </div>
    <!-- In Person Training and Actions -->
    <div class="form-row">
      <div class="form-group">
        <label for="inPersonTraining">In Person Training</label>
        <input
          id="inPersonTraining"
          type="text"
          v-model="inPersonTraining"
          placeholder="Enter In Person Training"
        />
      </div>
      <div class="actions">
        <button class="generate-code" :disabled="!canGenerateCode">
          Generate Code
        </button>
      </div>
    </div>

    <!-- Displayed Code -->
    <div class="generated-code">
      <p v-if="generatedCode">{{ generatedCode }}</p>
      <div class="resend-code">
        <p>
          <span class="resend-link" @click="resendCode">Resend Code</span>
          <br />
          <span class="renewal-info">Renews on 30th October 2025</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      responderId: "",
      preCourseAssessment: "",
      postCourseAssessment: "",
      generatedCode: "NG-LFR-0023", // Default code for display
    };
  },
  computed: {
    canGenerateCode() {
      return (
        this.responderId &&
        this.preCourseAssessment &&
        this.postCourseAssessment
      );
    },
  },
  methods: {
    resendCode() {
      // Logic to resend the code
      alert("Code resent successfully!");
    },
  },
};
</script>

<style scoped>
.responder-form {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
