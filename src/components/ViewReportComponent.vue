<template>
    <div class="report-list">
      <v-container>
        <v-row dense>
          <v-col
            v-for="(report, index) in reports"
            :key="index"
            cols="12"
          >
            <v-card class="report-card" outlined>
              <v-card-text>
                <div class="header">
                  <h3 class="title">ID {{ report.id }} Report</h3>
                  <span
                    class="status"
                    :class="{ alive: report.status === 'Alive', deceased: report.status === 'Deceased' }"
                  >
                    <v-icon
                      size="16px"
                      class="status-icon"
                      :color="report.status === 'Alive' ? 'green' : 'red'"
                    >
                      {{ report.status === 'Alive' ? 'mdi-circle' : 'mdi-alert-circle' }}
                    </v-icon>
                    {{ report.status }}
                  </span>
                </div>
  
                <!-- Table-like Layout for Report Details -->
                <v-row>
                  <v-col v-for="(label, index) in detailLabels" :key="index" cols="4">
                    <p><strong>{{ label }}:</strong> {{ report[detailKeys[index]] }}</p>
                  </v-col>
                </v-row>
                
              </v-card-text>
              <div class="d-flex justify-end">
                <v-card-actions >
                <v-btn variant="text" class="red-text"
                @click="viewDetails(report)">See Details</v-btn>
              </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    name: "ViewReportComponent",
    props: {
      reports: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        // Labels for each report detail
        detailLabels: [
          "Age", 
          "Sex", 
          "Chief Medical Complaint", 
          "Care Provided", 
          "Mechanism of Injury", 
          "Location"
        ],
        // Keys to access the corresponding values in the report object
        detailKeys: [
          "age", 
          "sex", 
          "complaint", 
          "care", 
          "injury", 
          "location"
        ],
      };
    },
    methods: {
      viewDetails(report) {
        console.log("Viewing details for report:", report);
        this.$router.push({ name: "ReportDetailsPage", params: { id: report.id } });
      },
    },
  };
  </script>
  
  <style scoped>
  .report-list {
    max-height: 70vh; /* Adjust height to fit available space */
    overflow-y: auto; /* Add vertical scrolling for overflow content */
   
  }
  
  .report-card {
    border-radius: 8px;
    margin-bottom: 10px;
    transition: box-shadow 0.3s;
  }
  
  .report-card:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
  
  .status {
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  
  .status-icon {
    margin-right: 4px;
  }
  
  .details p {
    margin: 4px 0;
    font-size: 14px;
  }
  
  .details p strong {
    font-weight: 600;
  }
  
  .v-btn {
    color: var(--v-primary-base);
    text-transform: none;
    justify-content: end;
  }
  .v-card-actions {
  position: relative;
  margin-top: 20px;
}
  .report-list::-webkit-scrollbar {
    width: 8px;
  }
.green-text {
  color: #4caf50; /* Custom green color */
}
  
  .report-list::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 4px;
  }

  .report-list::-webkit-scrollbar-thumb:hover {
    background: #a0a0a0;
  }
  </style>