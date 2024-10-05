<!-- src/pages/LeaderBoard.vue -->
<template>
  <v-container>
    <v-card  flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
        Search for responder
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
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

    </v-data-table-server>

  </v-container>
</template>

<script>


const data = [];
const locations = ['Ghana', 'Nigeria', 'Kenya', 'Uganda', 'South Africa', 'Egypt', 'Morocco', 'Rwanda'];
const injuryTypes = ['Arm', 'Leg', 'Head', 'Back', 'Chest', 'Neck', 'Foot', 'Hand'];

for (let i = 1; i <= 200; i++) {
  const countryCode = locations[Math.floor(Math.random() * locations.length)].substring(0, 2).toUpperCase();
  const responderId = `${countryCode}-LFR-${String(i).padStart(4, '0')}`;
  const responder = {
    id: responderId,
    name: `Responder ${i}`,
    noOfEmergencies: Math.floor(Math.random() * 300) + 50, // Random number between 50 and 350
    ranking: Math.floor(Math.random() * 10) + 1,           // Random rank between 1 and 10
    location: locations[Math.floor(Math.random() * locations.length)],
    injuryType: injuryTypes[Math.floor(Math.random() * injuryTypes.length)],
  };
  data.push(responder);
}

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = data.slice();

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          items.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            if (typeof aValue === 'number' && typeof bValue === 'number') {
              return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
            }
            return sortOrder === 'desc' ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
          });
        }

        const paginated = items.slice(start, end);
        resolve({ items: paginated, total: items.length });
      }, 1000);
    });
  }
};

export default {
  components: {
  },
  data: () => ({
    name: 'LeaderBoard',
    itemsPerPage: 10,
    page: 1,
    pageCount: 0,
    headers: [
      { title: 'ID', key: 'id', align: 'start', sortable: true },
      { title: 'Name', key: 'name', align: 'start', sortable: true },
      { title: 'No. of Emergencies', key: 'noOfEmergencies', align: 'center', sortable: true },
      { title: 'Ranking', key: 'ranking', align: 'center', sortable: true },
      { title: 'Location', key: 'location', align: 'center', sortable: false },
      { title: 'Injury Type', key: 'injuryType', align: 'center', sortable: false },
    ],
    search: '',
    serverItems: [],
    loading: true,
    totalItems: 0,
    sortBy: [],
  }),
  methods: {
    loadItems({ page = this.page, itemsPerPage = this.itemsPerPage, sortBy = this.sortBy }) {
      this.loading = true;
      FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
        this.serverItems = items;
        this.totalItems = total;

        this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
        this.loading = false;
      });
    },
    handleSearch() {
      this.currentPage = 1; // Reset to the first page whenever a search is performed
      this.loadItems({ page: this.currentPage, itemsPerPage: this.itemsPerPage });
    },

  },
  mounted() {
    this.loadItems({ page: this.page, itemsPerPage: this.itemsPerPage, sortBy: this.sortBy });
  }
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
  line-height: 1.2;
}
</style>
