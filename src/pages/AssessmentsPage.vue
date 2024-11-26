<template>
  <v-card>
    <v-tabs v-model="tab" align-tabs="center" hide-slider grow>
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
        <v-tabs-window-item v-for="(tabLabel, index) in tabs" :key="index" :value="tabLabel.value">
          <StatsBar :stats="statsData" />
          <template v-if="tabLabel.value === 'one'">
            <UploadAssessment />
          </template>
          <template v-else-if="tabLabel.value === 'two'">
            <p>Content for Upload Videos</p>
          </template>
          <template v-else-if="tabLabel.value === 'three'">
            <GenerateAccessCode />
          </template>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script>
import StatsBar from '@/components/StatsBar.vue'; // Ensure correct path
import UploadAssessment from '@/components/UploadAssessment.vue'; 
import GenerateAccessCode from '@/components/GenerateAccessCode.vue'; 

export default {
  components: {
    StatsBar,
    UploadAssessment,
    GenerateAccessCode
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
  background-color: #b71c1c; /* Primary color for active tab */
  color: white;
}

.inactive-tab {
  background-color: #e0e0e0; /* Grey color for inactive tabs */
  color: #757575;
}

</style>
