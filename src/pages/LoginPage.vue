<template>
  <v-layout>
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <v-container class="d-flex align-center justify-center" style="height: 100vh">
        <v-card class="mx-auto" width="350" elevation="2">
          <v-card-title class="justify-center">
            <h3>{{ isLoginPage ? 'Login' : 'Register' }}</h3>
          </v-card-title>
          <v-card-text>
            <!-- Display alerts using AlertComponent -->
            <AlertComponent 
              v-if="errorMessage" 
              alertType="error" 
              icon="error"
              :message="errorMessage" 
              @close="errorMessage = ''"
            />
            <AlertComponent 
              v-if="successMessage" 
              alertType="success" 
              :message="successMessage" 
              @close="successMessage = ''"
            />

            <v-form ref="form" v-model="isFormValid" lazy-validation>
              <!-- Email field -->
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                hide-details="auto"
                placeholder="user@gmail.com"
                persistent-hint
                variant="outlined"
                class="mt-10"
                @focus="setTouched('email')"
              ></v-text-field>

              <!-- Password field -->
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                variant="outlined"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                class="mt-5"
                @focus="setTouched('password')"
              >
                <template v-slot:append-inner>
                  <v-icon @click="togglePasswordVisibility">
                    {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                  </v-icon>
                </template>
              </v-text-field>

              <!-- Confirm Password field for registration -->
              <v-text-field
                v-if="!isLoginPage"
                v-model="confirmPassword"
                :rules="confirmPasswordRules()"
                variant="outlined"
                class="mb-5"
                :type="showPassword ? 'text' : 'password'"
                label="Confirm Password"

                @focus="setTouched('confirmPassword')"
              >
                <template v-slot:append-inner>
                  <v-icon @click="togglePasswordVisibility">
                    {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                  </v-icon>
                </template>
              </v-text-field>

              <!-- Submit button -->
              <div class="d-flex justify-center">
                <v-btn
                  :loading="loading"
                  class="mt-5"
                  variant="outlined"
                  size="small"
                  height="45"
                  @click="onSubmit"
                >
                  {{ isLoginPage ? 'Login' : 'Register' }}
                </v-btn>
              </div>
            </v-form>

            <!-- Toggle between Login and Register -->
            <div class="d-flex justify-center mt-3">
              <v-btn variant="text" size="small" @click="togglePage">
                <span>
                  {{ isLoginPage ? "Don't have an account?" : 'Already have an account?' }}
                </span>
                <span class="red--text">
                  {{ isLoginPage ? ' Register Here' : ' Sign In' }}
                </span>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
import { authService } from '@/services/AuthAPIServices';
import AlertComponent from '@/components/AlertComponents.vue'; // Ensure the path is correct

export default {
  name: 'LoginPage',
  components: {
    AlertComponent,
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      loading: false,
      isFormValid: false,
      isLoginPage: true,
      touchedFields: {
        email: false,
        password: false,
        confirmPassword: false,
      },
      errorMessage: '', // Holds error messages
      successMessage: '', // Holds success messages
      emailRules: [
        value => (!this.touchedFields.email || !!value) || 'Email is required.',
        value => (!this.touchedFields.email || /.+@.+\..+/.test(value)) || 'Email must be valid.'
      ],
      passwordRules: [
        value => (!this.touchedFields.password || !!value) || 'Password is required.',
        value => (!this.touchedFields.password || value.length >= 8) || 'Password must be at least 8 characters long.',
        value => (!this.touchedFields.password || /[A-Z]/.test(value)) || 'Password must contain at least one uppercase letter.',
        value => (!this.touchedFields.password || /[0-9]/.test(value)) || 'Password must contain at least one number.',
        value => (!this.touchedFields.password || /[@$!%*?&#]/.test(value)) || 'Password must contain at least one special character.'
      ]
    };
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    togglePage() {
      this.isLoginPage = !this.isLoginPage;
      this.clearForm();
    },

    clearForm() {
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.touchedFields = { email: false, password: false, confirmPassword: false };
      this.errorMessage = ''; // Clear error message when changing pages
    },

    setTouched(field) {
      this.touchedFields[field] = true;
    },

    confirmPasswordRules() {
      return [
        value => (!this.touchedFields.confirmPassword || !!value) || 'Please confirm your password.',
        value => (!this.touchedFields.confirmPassword || value === this.password) || 'Passwords do not match.'
      ];
    },

    async onSubmit() {
      const form = this.$refs.form;

      // Validate form before submitting
      if (form.validate()) {
        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        try {
          if (this.isLoginPage) {
            const response = await authService.login(this.email, this.password);
            authService.saveToken(response.token); // Save JWT token
            this.successMessage = 'Login successful!';
          } else {
            const response = await authService.register(this.email, this.password, this.confirmPassword);
            authService.saveToken(response.token); // Save JWT token
            this.successMessage = 'Registration successful!';
          }
        } catch (error) {
          this.errorMessage = error.message || 'An error occurred. Please try again.';
        } finally {
          this.loading = false;
        }
      } else {
        console.log('Form validation failed.');
      }
    }
  }
}
</script>

<!-- <style scoped>
/* Custom styles */
.v-form {
  max-width: 400px;
  margin: 0 auto;
}

.v-btn {
  width: 100%;
}
</style> -->
