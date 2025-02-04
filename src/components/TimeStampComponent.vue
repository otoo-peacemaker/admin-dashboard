<template>
  <div class="timestamps">
    <div class="row">
      <div class="column">
        <p><strong>Notified</strong><br />{{ timestamps.notified }}</p>
        <p><strong>On Scene</strong><br />{{ timestamps.onScene }}</p>
        <p><strong>Call Completed</strong><br />{{ timestamps.callCompleted }}</p>
      </div>
      <div class="column">
        <p><strong>Request Accepted</strong><br />{{ timestamps.requestAccepted }}</p>
        <p><strong>To Hospital</strong><br />{{ timestamps.toHospital }}</p>
        <p><strong>Dist. From Emerg.</strong><br />{{ timestamps.distance }} <span class="unit">metres</span></p>
      </div>
    </div>
  </div>
</template>

  
<script>
export default {
  name: "TimeStampComponent",
  props: {
    timestamps: {
      type: Object,
      required: true
    }
  }
};
</script>
  
  <style scoped>
  .timestamps {
    padding: 10px;
    border-radius: 8px;
    font-family: Arial, sans-serif;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .column {
    flex: 1;
    padding: 5px;
  }
  .unit {
    color: red;
  }
  </style>
  