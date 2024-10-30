<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="primary" :elevation="1" >
      <v-toolbar-title v-if="showTitle">SnooCODERED Admin Portal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="showProfileIcon">
        <v-avatar>
          <img src="https://via.placeholder.com/40" alt="Profile" />
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <!-- Main Layout with Sidebar and Content -->
    <v-container fluid class="main-container fill-height no-padding" v-if="!isLoginPage">
      <v-row no-gutters>
        <!-- Sidebar -->
        <Sidebar :showSidebar="showSidebar" />

        <!-- Main Content -->
        <v-col cols="12" class="main-content">
          <v-main>
            <v-card class="ma-10 d-flex flex-column justify-center align-center" elevation="1">
              <router-view />
            </v-card>
          </v-main>
        </v-col>
      </v-row>
    </v-container>

    <!-- Login Page (without App Layout) -->
    <router-view v-else />

    <!-- Footer -->
    <v-footer color="grey lighten-4" class="footer-margin" v-if="showFooter">
      <v-col class="text-center">Emergency Toll Free Number: 121</v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Sidebar from './components/SideBarComponent.vue';

export default {
  name: 'App',
  components: { Sidebar },
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
    showFooter() {
      return this.$route.meta.showFooter !== false; // Show footer unless explicitly set to false
    },
    isLoginPage() {
      return this.$route.name === 'LoginPage'; // Check if it's the login page
    },
  },
  created() {
    // Set default route to Leader Board if it's not already set or login page
    if (!this.isLoginPage && this.$route.name !== 'leaderboard') {
      this.$router.push({ name: 'leaderboard' });
    }
  },
};
</script>

<style scoped>
.main-container {
  margin: 0;
}

.drawer-margin {
  margin: 35px 0 15px 20px;
}

.main-content {
  padding: 20px;
}

.footer-margin {
  margin: 15px 15px 10px 290px;
}
</style>
