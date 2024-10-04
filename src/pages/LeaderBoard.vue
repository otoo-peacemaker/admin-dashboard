<template>
  <v-container>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        :search="search"
        item-value="name"
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

console.log(data);


const FakeAPI = {
  async fetch ({ page, itemsPerPage, sortBy }) {
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
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
          });
        }

        const paginated = items.slice(start, end);
        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  }
};

export default {
  data: () => ({
    name: 'LeaderBoard',
    itemsPerPage: 5,
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
  }),
  methods: {
    loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
        this.serverItems = items;
        this.totalItems = total;
        this.loading = false;
      });
    },
    sortTable(column) {
      if (this.sortBy[0]?.key === column) {
        this.sortBy[0].order = this.sortBy[0].order === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = [{ key: column, order: 'asc' }];
      }
      this.loadItems({ page: 1, itemsPerPage: this.itemsPerPage, sortBy: this.sortBy });
    },
    getSortIcon(column) {
      const sort = this.sortBy.find(sort => sort.key === column);
      return sort && sort.order === 'desc' ? 'mdi-arrow-down' : 'mdi-arrow-up';
    }
  },
};
</script>
<style scoped>
.header-cell {
  background-color: #B11F1A;
  color: white;
  padding: 16px;
}
.sort-icon {
  cursor: pointer;
  margin-right: 8px;
}
.elevation-1 {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
}
</style>