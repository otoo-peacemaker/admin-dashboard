<template>
  <v-item-group mandatory>
    <v-container>
      <v-row>
        <v-col
          v-for="(card, index) in cards"
          :key="index"
          cols="12"
          md="6"
        >
          <v-item v-slot="{ isSelected }">
            <v-card
              :color="isSelected ? 'primary' : 'primary'"
              class="d-flex justify-center align-center"
              height="141"
              dark
              @click="navigateTo(card.route)"
              :style="{ width: '399px', borderRadius: '10px', opacity: '0.8' }"
            >
              <v-scroll-y-transition>
                <div class="text-h5 flex-grow-1 text-center">
                  {{ card.title }}
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  name: 'AssessmentsPage',
  data() {
    return {
      // Array of cards with titles and routes
      cards: [
        { title: 'Upload Courses', route: 'UploadCourses' },
        { title: 'Metrics', route: 'MetricsPage' },
        { title: 'Generate Access Codes', route: 'GenerateAccessCodes' },
      ],
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style scoped>
/* Custom styles for the cards if needed */
</style>
