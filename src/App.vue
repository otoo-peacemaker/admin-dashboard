<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="primary" :elevation="1">
      <v-toolbar-title v-if="showTitle">SnooCODERED Admin Portal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="showProfileIcon">
        <v-avatar>
          <img src="https://via.placeholder.com/40" alt="Profile" />
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <!-- Grid Layout with Sidebar and Content -->
    <v-container fluid class="main-container fill-height no-padding">
      <v-row no-gutters>
        <!-- Sidebar (2 columns) -->
        <v-col cols="2" class="drawer-margin">
          <v-navigation-drawer :elevation="2">
            <v-list dense>
              <v-list-item title="Home" class="home-drawer-item"></v-list-item>
              <v-divider></v-divider>
              <v-list-item
                :class="['drawer-item', { 'primary': isActive('leaderboard') }]"
                @click="navigateTo('leaderboard')"
                title="Leader Board"
              ></v-list-item>
              <v-list-item
                :class="['drawer-item', { 'primary': isActive('assessments') }]"
                @click="navigateTo('assessments')"
                title="Assessments"
              ></v-list-item>
              <v-list-item
                :class="['drawer-item', { 'primary': isActive('responder-data') }]"
                @click="navigateTo('responder-data')"
                title="Responder Data"
              ></v-list-item>
              <v-list-item
                :class="['drawer-item', { 'primary': isActive('incident-info') }]"
                @click="navigateTo('incident-info')"
                title="Incident Information"
              ></v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-col>

        <!-- Main Content (12 columns) -->
        <v-col cols="12" class="main-content">
          <v-main>
            <v-card class="ma-10 d-flex flex-column justify-center align-center" elevation="1">
        
              <router-view />
            
          </v-card>
          </v-main>
        </v-col>
      </v-row>
    </v-container>

    <!-- Footer -->
    <v-footer color="grey lighten-4" class="footer-margin">
      <v-col class="text-center">Emergency Toll Free Number: 121</v-col>
    </v-footer>
  </v-app>
</template>


<script>
export default {
  name: 'App',
  computed: {
    // Compute values based on the current route's meta fields
    showTitle() {
      return this.$route.meta.showTitle !== false; // Show title unless explicitly set to false
    },
    showProfileIcon() {
      return this.$route.meta.showProfileIcon || false; // Show profile icon if set to true
    },
    showSidebar() {
      return this.$route.meta.showSidebar || false; // Show sidebar if set to true
    },
  },
  methods: {
    // Method to navigate to specific route
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    // Check if the route is active
    isActive(routeName) {
      return this.$route.name === routeName;
    },
  },
};
</script>

<style scoped>
.main-container {
  margin: 0; /* Remove padding/margins from container */
}

.no-padding {
  padding: 0;
}

.drawer-margin {
  margin: 10px 0 40px 0; /* Drawer margin around the navigation drawer TRouBLe*/
}

.main-content {
  padding: 20px; /* Add padding to the main content area */
}

.footer-margin {
  margin: 10px 15px 10px 290px; /* Add margin around the footer */
}
.drawer-item {
  margin: 10px 20px 10px 20px; /* Add vertical margin between items */
  border-radius: 10px; /* Set border radius for items */
  background-color: #f5f5f5; /* Inactive item background color */
}
.home-drawer-item {
  margin: 30px 0px 10px; /* Add vertical margin between items */
  border-radius: 10px; /* Set border radius for items */

}
/* Style for the active item */
.primary {
  background-color: #B11F1A !important; /* Set active color to primary */
  color: #F0F0F0 !important; /* Set text color to white for visibility */
}
</style>