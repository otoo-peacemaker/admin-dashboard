<template>
  <div>
    <v-alert
      v-if="isVisible"
      :value="true"
      :color="alertType"
      :icon="icon"
       variant="outlined"
      @click="handleClick"
    >
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'AlertComponent',
  props: {
    alertType: {
      type: String,
      required: true,
      validator: (value) => ['success', 'info', 'warning', 'error'].includes(value),
    },
    message: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    // Use Vuetify's Material Design Icons (mdi-*)
    icon() {
      switch (this.alertType) {
        case 'success':
          return 'mdi-check-circle';
        case 'info':
          return 'mdi-information';
        case 'warning':
          return 'mdi-alert-circle';
        case 'error':
          return 'mdi-alert';
        default:
          return '';
      }
    },
  },
  methods: {
    handleClick() {
      this.$emit('close'); // Emit close event on click
    },
  },
};
</script>
