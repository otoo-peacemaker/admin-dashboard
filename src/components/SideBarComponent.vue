<!-- Sidebar.vue -->
<template>
  <v-navigation-drawer
      :elevation="2"
      style="height: auto"
      location="left"
      class="drawer-margin"
      permanent
      v-if="showSidebar">
    <v-list dense>
      <v-list-item title="Home" class="home-drawer-item"></v-list-item>
      <v-divider></v-divider>
      <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :class="['drawer-item', { 'primary': isActive(item.route) }]"
          @click="navigateTo(item.route)"
          :title="item.title"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <template v-slot:append>
      <div class="pa-2" >
        <v-btn variant="flat" block @click="logout">
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { authService } from '@/services/AuthAPIServices'; // Import your auth service if it contains helper methods
export default {
  props: ['showSidebar'],
  data() {
    return {
      menuItems: [
        {title: 'Leader Board', route: 'leaderboard'},
        {title: 'Assessments', route: 'assessments'},
        {title: 'Responder Data', route: 'responder-data'},
        {title: 'Incident Information', route: 'incident-info'},
      ],
    };
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({name: routeName});
    },
    isActive(menuName) {
      return this.$route.meta.activeMenu === menuName;
    },
    logout() {
       // Clear the token from local storage
      authService.logout();
      // Redirect to the login page
      this.$router.push({ name: 'LoginPage' });
    },
  },
};
</script>

<style scoped>
.drawer-item {
  margin: 10px 20px;
  border-radius: 10px;
  background-color: #f5f5f5;
}

.primary {
  background-color: #B11F1A !important;
  color: #F0F0F0 !important;
}
</style>
