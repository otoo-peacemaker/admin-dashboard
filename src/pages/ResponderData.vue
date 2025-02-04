<template>
  <v-container>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        Responder List
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
   
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="name"
      class="v-data-table-header"
      @update:options="loadItems"
    >
      <!-- Slot for Incident Reports -->
       <template v-slot:[`item.report`]="{ item }">
        <span class="view-report" @click="viewReport(item)">
          View Report
        </span>
      </template>
    </v-data-table-server>
      <!-- Conditional Rendering of ReportDetails Component -->
      <v-dialog v-model="showReport" persistent width="auto" close-on-back="true">
    <!-- Dialog Content -->
    <v-card>
      <!-- Custom Header with Close Button -->
      <v-card-title class="position-relative" style="padding-bottom: 8px;" >
        <span class="headline">Report Details</span>
        <!-- Close Button Positioned Top-Right -->
        <v-btn icon @click="closeDialog" class="close-btn" >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-card-text class="content-space" >
        <!-- Your ViewReportComponent goes here -->
        <ViewReportComponent
          v-if="selectedReport"
          :reports="this.reports"
          @close="showReport = false"
        />
      </v-card-text>
    </v-card>
  </v-dialog> 
  </v-container>
</template>
 
  <script>
import { getResponders } from '@/services/ResponderAPIService';
import ViewReportComponent from "@/components/ViewReportComponent.vue";

const APICall = {
  async fetch({ page, itemsPerPage, sortBy, search }) {
    try {
      const response = await getResponders(); // Fetch data from the backend
      console.log('Raw data from API:', response.data); // Log the raw data
      let data = response.data;

      // Apply search filter
      if (search) {
        data = data.filter((responder) =>
          Object.values(responder)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }

      // Apply sorting
      if (sortBy.length) {
        const sortKey = sortBy[0].key;
        const sortOrder = sortBy[0].order;
        data.sort((a, b) => {
          const aValue = a[sortKey];
          const bValue = b[sortKey];
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
          }
          return sortOrder === 'desc'
            ? bValue?.localeCompare(aValue)
            : aValue?.localeCompare(bValue);
        });
      }

      // Apply pagination
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginated = data.slice(start, end);

      console.log('Processed data:', paginated); // Log processed data
      return { items: paginated, total: data.length };
    } catch (error) {
      console.error('Error fetching responders:', error.response?.data || error.message);
      throw new Error('Failed to fetch responders');
    }
  },
};
    export default {
      name: 'ResponderData',
      components: {
        ViewReportComponent
      },
      data: () => ({
        itemsPerPage: 10,
        page: 1,
        search: '',
        headers: [
         
          { title: 'Responder ID', key: 'responderId', align: 'start',sortable:true },
          { title: 'Pre-course Assessment', key: 'pre_course_assessment', align: 'start', sortable:false},
          { title: 'Post-course Assessment', key: 'post_course_assessment', align: 'start',sortable:false },
          { title: 'Number of Responses', key: 'responses', align: 'start',sortable:true },
          { title: 'Incident Reports', key: 'report', align: 'start' },
        ],
        serverItems: [],
        loading: true,
        totalItems: 0,
        sortBy: [],
        showReport: false,
        selectedReport: [],
        responderId: 2, 
        reports: [
        // Dummy data for reports
        {
          id: 1,
          status: 'Alive',
          age: 25,
          sex: 'Male',
          complaint: 'Fracture',
          care: 'First Aid',
          injury: 'Car Accident',
          location: 'City A',
          responderId: 1,
        },
        {
          id: 2,
          status: 'Deceased',
          age: 30,
          sex: 'Female',
          complaint: 'Head Injury',
          care: 'CPR',
          injury: 'Fall',
          location: 'City B',
          responderId: 2,
        },
        {
          id: 3,
          status: 'Alive',
          age: 40,
          sex: 'Male',
          complaint: 'Burn',
          care: 'Cool Water',
          injury: 'Fire',
          location: 'City C',
          responderId: 2,
        },
      ],

      }),
    methods: {
    loadItems({ page = this.page, itemsPerPage = this.itemsPerPage, sortBy = this.sortBy }) {
      this.loading = true;
      APICall.fetch({ page, itemsPerPage, sortBy, search: this.search }).then(({ items, total }) => {
        this.serverItems = items;
        this.totalItems = total;
        this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
        this.loading = false;
      });
    },
    handleSearch() {
      this.page = 1; 
      this.loadItems({ page: this.page, itemsPerPage: this.itemsPerPage });
    },
    viewReport(item) {
    console.log(`Viewing report for responder ID: ${item.responderId}`);
      this.selectedReport = item; // Pass the clicked item's details to the component
      this.showReport = true; // Open the dialog
      this.showReportDialog =true;
    // Add additional logic for viewing the report if needed
  },
  filteredReports() {
      // Filter reports based on responderId
      return this.reports.filter((report) => report.responderId === this.responderId);
    },
    closeDialog() {
      this.showReport = false;
    },
  },
 
  mounted() {
    this.loadItems({ page: this.page, itemsPerPage: this.itemsPerPage, sortBy: this.sortBy });
  },
    };
  </script>

  <style scoped>
:deep(.v-pagination) {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

:deep(.v-pagination__item) {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: #f5f5f5;
}

:deep(.v-icon) {
  vertical-align: middle;
  font-size: 18px;
  line-height: 1.5;
}
.view-report {
  color: #39eb66; 
  cursor: pointer;
  text-decoration: underline;
}
.view-report:hover {
  color: #4e00b3; 
  font-weight: bold;
}
.close-btn {
  position: absolute;
  top: 5px;
  right: 16px;

}
.v-card-title {
  position: relative;
  justify-content: center;
  align-items: center;
}
.content-space {
  margin-top: 16px; /* Adjust this value to set the space you want */
}
.v-card-text {
  padding-top: 16px; /* Optional: add extra padding if needed */
}


  </style>
  