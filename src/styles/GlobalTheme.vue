<template>
    <v-app>
      <v-switch
        v-model="isDark"
        :label="`Theme: ${isDark ? 'Dark' : 'Light'}`"
        @change="toggleTheme"
      ></v-switch>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDark: false,  // Default to light mode
      }
    },
    methods: {
      toggleTheme() {
        this.$vuetify.theme.global.name = this.isDark ? 'myCustomDarkTheme' : 'myCustomLightTheme'
      },
    },
  }
  </script>
  