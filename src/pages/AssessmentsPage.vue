<template>
  <v-card>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      hide-slider
      grow
    >
      <v-tab
        v-for="(tabLabel, index) in tabs"
        :key="index"
        :value="tabLabel.value"
        :class="tabClass(tab === tabLabel.value)"
        elevation="2"
        grow
      >
        {{ tabLabel.label }}
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <StatsBar :stats="statsData" />
          <div>
    <v-select
      :items="items"
      density="comfortable"
      label="Select Assessment Type"
      variant="outlined"
    ></v-select>
  </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          <StatsBar :stats="statsData" />
          <p>Content for Upload Videos</p>
        </v-tabs-window-item>

        <v-tabs-window-item value="three">
          <StatsBar :stats="statsData" />
          <p>Content for Generate Access Code</p>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script>
import StatsBar from '@/components/StatsBar.vue'; // Ensure correct path
export default {
  components: {
    StatsBar,
  },
  data() {
    return {
      tab: 'one',
      tabs: [
        { label: 'Upload Assessment', value: 'one' },
        { label: 'Upload Videos', value: 'two' },
        { label: 'Generate Access Code', value: 'three' },
      ],
      statsData: [
        { label: 'Completed Test', value: '72/100' },
        { label: 'Average Percentage', value: '75%' },
        { label: 'Average Duration', value: '45 mins' },
        { label: 'In Person Attendance', value: '70' },
      ],
      items: ['Pre-Course Assessment', 'Post Course Assessment', 'Demographic & Psychographic'],
    };
  },
  methods: {
    tabClass(isActive) {
      return isActive ? 'active-tab' : 'inactive-tab';
    },
  },
};
</script>

<style scoped>
.v-card {
  width: 100%;
}

.v-tab {
  flex: 1 1 auto; /* Ensure tabs evenly distribute */
  text-align: center;
  transition: background-color 0.3s ease;
}

.active-tab {
  background-color:  #b71c1c; /* Primary color for active tab */
  color: white;
}

.inactive-tab {
  background-color: #e0e0e0; /* Grey color for inactive tabs */
  color: #757575;
}

.stats-bar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Adjusts to available width */
  padding: 16px;
  background-color: #b71c1c;
}

.stat-item {
  flex: 1 1 calc(25% - 16px); /* Items share the space equally */
  margin: 8px;
  text-align: center;
  color: white;
}

.stat-label {
  font-weight: bold;
}

.stat-value {
  font-size: 1.2em;
}
</style>
