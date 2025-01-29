<template>
    <div class="report-section">
      <div class="section-content">
        <p :class="statusClass">{{ disposition }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DispositionComponent',
    props: {
      disposition: String,
    },
    computed: {
      statusClass() {
        return this.disposition === 'Alive' ? 'text-success' : 'text-danger';
      },
    },
  };
  </script>
  
  <style scoped>
  .text-success {
    color: var(--secondary-color);
  }
  
  .text-danger {
    color: var(--primary-color);
  }
  </style>