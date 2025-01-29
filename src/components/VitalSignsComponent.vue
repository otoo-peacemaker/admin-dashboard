<template>
    <div class="report-section">
      <!-- <h3 class="section-header">Vital Signs</h3> -->
      <div class="section-content">
        <p><strong>Heart Rate:</strong> {{ heartRate }} bpm</p>
        <p><strong>Blood Pressure:</strong> {{ bloodPressure }} mm/Hg</p>
        <p><strong>Respiratory Rate:</strong> {{ respiratoryRate }} R/m</p>
        <p><strong>Temperature:</strong> {{ temperature }}°C</p>
        <p><strong>No. of Severe Injuries:</strong> {{ severeInjuries }}</p>
        <p><strong>Location of Injury:</strong> {{ injuryLocation }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VitalSignsComponent',
    props: {
      heartRate: Number,
      bloodPressure: Number,
      respiratoryRate: Number,
      temperature: Number,
      severeInjuries: Number,
      injuryLocation: String,
    },
  };
  </script>