<template>
    <div class="on-scene-report">
      <p><strong>Cause of Injury:</strong> {{ report?.cause || 'N/A' }}</p>
<p><strong>Care Provided:</strong> {{ report?.care || 'N/A' }}</p>
<p><strong>Area of Injury:</strong> {{ report?.area || 'N/A' }}</p>

      <p><strong>Triage:</strong></p>
      <div class="triage">
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OnSceneReportComponent',
    props: {
      report: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .on-scene-report {
    padding: 10px;
    border-radius: 8px;
    margin-top: auto;
    font-family: Arial, sans-serif;
  }
  .triage {
    display: flex;
    gap: 5px;
  }
  .triage span {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 5px;
  }
  .red { background: red; }
  .yellow { background: yellow; }
  .green { background: green; }
  </style>
  