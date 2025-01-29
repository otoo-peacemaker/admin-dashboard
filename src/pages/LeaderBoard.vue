<!-- src/pages/LeaderBoard.vue -->
<template>
  <v-container>
    <v-card  flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-video-input-component"></v-icon>
        Search for responder
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

    </v-data-table-server>

  </v-container>
</template>

<script>
import { getResponders } from '@/services/ResponderAPIService';

const APICall = {
  async fetch({ page, itemsPerPage, sortBy, search }) {
    try {
      const response = await getResponders(); // Fetch data from the backend
      let data = response.data;
      console.log(data);
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
          return sortOrder === 'desc' ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
        });
      }

      // Apply pagination
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginated = data.slice(start, end);

      return { items: paginated, total: data.length };
    } catch (error) {
      console.error('Error fetching responders:', error);
      throw new Error('Failed to fetch responders');
    }
  },
};

export default {
  data: () => ({
    name: 'LeaderBoard',
    itemsPerPage: 10,
    page: 1,
    pageCount: 0,
    headers: [
      { title: 'ID', key: 'responderId', align: 'start', sortable: true },
      { title: 'Name', key: 'username', align: 'start', sortable: false },
      { title: 'No. of Emergencies', key: 'noOfEmergencies', align: 'center', sortable: false },
      { title: 'Ranking', key: 'ranking', align: 'center', sortable: false },
      { title: 'Location', key: 'country', align: 'center', sortable: true }
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
      APICall.fetch({ page, itemsPerPage, sortBy, search: this.search }).then(({ items, total }) => {
        this.serverItems = items;
        this.totalItems = total;

        this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
        this.loading = false;
      });
    },
    handleSearch() {
      this.page = 1; // Reset to the first page whenever a search is performed
      this.loadItems({ page: this.page, itemsPerPage: this.itemsPerPage });
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
  line-height: 1.2;
}
</style>
