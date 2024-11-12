<template>
    <div class="dashboard-header bg-red-500 text-white p-4">
      <div class="tabs">
        <button @click="selectTab('uploadAssessment')">Upload Assessment</button>
        <button @click="selectTab('uploadVideos')">Upload Videos</button>
        <button @click="selectTab('generateCode')">Generate Access Code</button>
      </div>
      <div class="stats flex justify-between mt-4">
        <div>Completed Test: 72/100</div>
        <div>Average Percentage: 75%</div>
        <div>Average Duration: 45 mins</div>
        <div>In-Person Attendance: 70</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      selectTab(tab) {
        // Handle tab switching logic
        console.log(tab);
      }
    }
  }
  </script>
  
  <style>
  .tabs button {
    margin-right: 1rem;
  }
  </style>
  