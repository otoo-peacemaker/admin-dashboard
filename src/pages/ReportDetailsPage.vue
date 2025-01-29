<template>
      
  
    <v-container class="report-container" fluid>
        <div >
        <h3></h3>
        <v-card flat class="page-title">
      <v-card-title class="page-title">
        Report Details
      </v-card-title>
    </v-card>

    
    </div>
      <v-row dense>
        <v-col cols="12">
          <!-- Report Header Card -->
    
          <v-card class="report-card" outlined>
            <v-card-title>ID 001-2024 Report</v-card-title>
            <v-card-text>
              <ReportHeaderComponent
                :age="28"
                sex="Male"
                injuryMechanism="Fall"
                chiefComplaint="Compound Fracture"
                careProvided="Splinter Fracture"
                location="Freetown, 4BN-IR6"
              />
            </v-card-text>
          </v-card>
  
          <!-- GCS Section Card -->
          <v-card class="report-card" outlined>
            <v-card-title>GCS Section</v-card-title>
            <v-card-text>
              <GCSSectionComponent
                eyeResponse="Spontaneous"
                verbalResponse="Confused"
                motorResponse="Localized pain"
                :gcsScore="5"
              />
            </v-card-text>
          </v-card>
  
          <!-- Vital Signs Card -->
          <v-card class="report-card" outlined>
            <v-card-title>Vital Signs</v-card-title>
            <v-card-text>
              <VitalSignsComponent
                :heartRate="88"
                :bloodPressure="120"
                :respiratoryRate="80"
                :temperature="37"
                :severeInjuries="2"
                injuryLocation="Ribs"
              />
            </v-card-text>
          </v-card>
  
          <!-- Care Provided Card -->
          <v-card class="report-card" outlined>
            <v-card-title>Care Provided</v-card-title>
            <v-card-text>
              <CareProvidedComponent
                bleedingControl="Applied sterile dressing to the wound to minimize the risk of infection."
                painManagement="Administered paracetamol for pain relief."
                immobilization="Applied a temporary splint."
                woundCleaning="Cleaned the wound with sterile saline."
                antibiotics="Administered prophylactic antibiotics."
              />
            </v-card-text>
          </v-card>
  
          <!-- Disposition Card -->
          <v-card class="report-card" outlined>
            <v-card-title>Disposition</v-card-title>
            <v-card-text>
              <DispositionComponent disposition="Alive" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import ReportHeaderComponent from "@/components/ReportHeaderComponent.vue";
  import GCSSectionComponent from "@/components/GCSSectionComponent.vue";
  import VitalSignsComponent from "@/components/VitalSignsComponent.vue";
  import CareProvidedComponent from "@/components/CareProvidedComponent.vue";
  import DispositionComponent from "@/components/DispositionComponent.vue";
  
  export default {
    name: "ReportDetailsPage",
    components: {
      ReportHeaderComponent,
      GCSSectionComponent,
      VitalSignsComponent,
      CareProvidedComponent,
      DispositionComponent,
    },
    props: {
      id: {
        type: String,
        required: false,
      },
    },
    data() {
      return {
        report: null,
      };
    },
    created() {
      this.fetchReportDetails();
    },
    methods: {
      fetchReportDetails() {
        const reports = JSON.parse(localStorage.getItem("reports")) || [];
        this.report = reports.find((report) => report.id === this.reportId);
      },
    },
    computed: {
      reportId() {
        return this.id || this.$route.params.id;
      },
    },
  };
  </script>
  
  <style scoped>
  .report-container {
    padding: 20px;
  }
  
  .report-card {
    margin-bottom: 20px;
    transition: box-shadow 0.3s ease;
    width: 100%;
  }
  
  .report-card:hover {
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  }
  
  .v-card-title {
    font-weight: bold;
    font-size: 18px;
    background-color: #ece8e8;
    border-bottom: 1px solid #ddd;
    padding: 10px 16px;
  }

  
  </style>