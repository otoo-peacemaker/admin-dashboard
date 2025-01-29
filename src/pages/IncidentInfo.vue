<template>
  <v-container>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        Search for report
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          flat
          hide-details
          single-line
          clearable
          @input="handleSearch"
        ></v-text-field>
      </v-card-title>
    </v-card>

    <!-- Pass the filtered reports to the ViewReportComponent -->
    <ViewReportComponent
      :reports="filteredReports"
      @close="showReport = false"
    />
  </v-container>
</template>

<script>
import ViewReportComponent from "@/components/ViewReportComponent.vue";

export default {
  name: "IncidentInfo",
  components: {
    ViewReportComponent,
  },
  data() {
    return {
      search: "",
      reports: [
        {
          id: 1,
          status: "Alive",
          age: 25,
          sex: "Male",
          complaint: "Fracture",
          care: "First Aid",
          injury: "Car Accident",
          location: "City A",
          responderId: 1,
        },
        {
          id: 2,
          status: "Deceased",
          age: 30,
          sex: "Female",
          complaint: "Head Injury",
          care: "CPR",
          injury: "Fall",
          location: "City B",
          responderId: 2,
        },
        {
          id: 3,
          status: "Alive",
          age: 40,
          sex: "Male",
          complaint: "Burn",
          care: "Cool Water",
          injury: "Fire",
          location: "City C",
          responderId: 2,
        },
        {
          id: 1,
          status: "Alive",
          age: 25,
          sex: "Male",
          complaint: "Fracture",
          care: "First Aid",
          injury: "Car Accident",
          location: "City A",
          responderId: 1,
        },
        {
          id: 2,
          status: "Deceased",
          age: 30,
          sex: "Female",
          complaint: "Head Injury",
          care: "CPR",
          injury: "Fall",
          location: "City B",
          responderId: 2,
        },
        {
          id: 3,
          status: "Alive",
          age: 40,
          sex: "Male",
          complaint: "Burn",
          care: "Cool Water",
          injury: "Fire",
          location: "City C",
          responderId: 2,
        },
      ],
    };
  },
  computed: {
    filteredReports() {
      const searchTerm = this.search.toLowerCase();
      return this.reports.filter((report) => {
        // Filter based on responderId and search term
        // if (report.responderId !== this.responderId) return false;

        // Check if any value in the report object matches the search term
        return Object.values(report).some((value) => {
          if (typeof value === "string" || typeof value === "number") {
            return value.toString().toLowerCase().includes(searchTerm);
          }
          return false;
        });
      });
    },
  },
  methods: {
    handleSearch() {
      // No additional logic needed; the computed property handles filtering
    },
  },
};
</script>

<style scoped>
/* Add any styles specific to Incident Info here */
</style>