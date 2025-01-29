<template>
    <div class="report-section">
      <div class="section-content">
        <ul>
          <li><strong>Bleeding Control:</strong> {{ bleedingControl }}</li>
          <li><strong>Pain Management:</strong> {{ painManagement }}</li>
          <li><strong>Immobilization:</strong> {{ immobilization }}</li>
          <li><strong>Cleaning of the Wound:</strong> {{ woundCleaning }}</li>
          <li><strong>Antibiotics:</strong> {{ antibiotics }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CareProvidedComponent',
    props: {
      bleedingControl: String,
      painManagement: String,
      immobilization: String,
      woundCleaning: String,
      antibiotics: String,
    },
  };
  </script>