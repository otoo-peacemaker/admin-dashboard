<template>
    <div class="stats-bar">
      <div class="stat-item" v-for="(stat, index) in stats" :key="index">
        <h4>{{ stat.label }}</h4>
        <p>{{ stat.value }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      stats: {
        type: Array,
        required: true,
        default: () => [
          { label: 'Completed Test', value: '72/100' },
          { label: 'Average Percentage', value: '75%' },
          { label: 'Average Duration', value: '45 mins' },
          { label: 'In Person Attendance', value: '70' },
        ],
      },
    },
  };
  </script>
  
  <style scoped>
  .stats-bar {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; /* Ensures wrapping when space is limited */
    width: 100%; /* Takes the full available width */
    background-color: #b71c1c; /* Red background */
    padding: 16px; /* Padding for spacing inside */
  }
  
  .stat-item {
    flex: 1 1 calc(25% - 16px); /* Distributes 4 items equally with spacing */
    margin: 8px; /* Space between items */
    text-align: center; /* Centers text horizontally */
    color: white; /* White text for contrast */
  }
  
  .stat-label {
    font-weight: bold;
  }
  
  .stat-value {
    font-size: 1.2em; /* Larger font for values */
  }
  </style>
  