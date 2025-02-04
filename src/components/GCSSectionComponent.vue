<template>
    <div class="report-section">
      <h3 class="section-header">GCS</h3>
      <div class="section-content">
        <p><strong>Eye Opening Response:</strong> {{ eyeResponse }}</p>
        <p><strong>Best Verbal Response:</strong> {{ verbalResponse }}</p>
        <p><strong>Best Motor Response:</strong> {{ motorResponse }}</p>
        <p><strong>GCS Score:</strong> {{ gcsScore }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GCSSectionComponent',
    props: {
      eyeResponse: String,
      verbalResponse: String,
      motorResponse: String,
      gcsScore: Number,
    },
  };
  </script>