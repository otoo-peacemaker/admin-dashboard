<template>
    <div class="report-section">
      <!-- <h2>ID 001-2024 Report</h2> -->
      <div class="section-content">
        
        <p><strong>Age:</strong> {{ age }}</p>
        <p><strong>Sex:</strong> {{ sex }}</p>
        <p><strong>Mechanism of Injury:</strong> {{ injuryMechanism }}</p>
        <p><strong>Chief Medical Complaint:</strong> {{ chiefComplaint }}</p>
        <p><strong>Care Provided:</strong> {{ careProvided }}</p>
        <p><strong>Location:</strong> {{ location }}</p>
      </div>
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReportHeaderComponent',
    props: {
      age: Number,
      sex: String,
      injuryMechanism: String,
      chiefComplaint: String,
      careProvided: String,
      location: String,
    },
  };
  </script>
  
  <style scoped>
  .report-header {
    background-color: var(--primary-color);
    color: #fff;
    padding: 10px;
    border-radius: 8px;
  }
  
  .header-row {
    display: flex;
    justify-content: space-between;
  }
  </style>