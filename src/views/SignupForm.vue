<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Form data
const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const showPassword = ref<boolean>(false)
const showConfirmPassword = ref<boolean>(false)

const router = useRouter()

// Methods
const togglePassword = (): void => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = (): void => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const handleSignup = (): void => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  console.log('Signing up with:', name.value, email.value, password.value)
  // TODO: Add signup API integration here
}
</script>

<template>
  <div
    class="flex flex-row justify-center items-center bg-cover bg-center min-h-screen bg-[url('@/assets/background-ls.png')]"
  >
    <div class="flex w-full max-w-6xl min-h-[600px] items-center justify-between px-8">
      <!-- Description Section -->
      <div class="flex-1 text-white flex flex-col justify-center pr-12">
        <h1 class="text-4xl font-bold mb-6 leading-tight">
          MAKE THE WORK EASY,<br />
          <span class="text-orange-500">MAKE IT WITH COMPANY!</span>
        </h1>
        <p class="text-lg max-w-md leading-relaxed">
          Create and manage secure IDs. Fast, smart, and simple.
        </p>
      </div>

      <!-- Form Card Section -->
      <div class="flex flex justify-center">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
          <!-- Orange header bar -->
          <div class="h-3 bg-orange-500"></div>

          <!-- Form content -->
          <div class="p-8">
            <!-- Logo -->
            <div class="text-center mb-6">
              <div class="text-orange-500 text-2xl font-bold mb-2">du ID CREATOR</div>
            </div>

            <!-- Form title -->
            <h2 class="text-2xl font-bold text-center mb-8 text-gray-800">Sign Up</h2>

            <!-- Form -->
            <form @submit.prevent="handleSignup" class="space-y-4">
              <!-- Full Name Input -->
              <div>
                <input
                  v-model="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  class="w-full p-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <!-- Email Input -->
              <div>
                <input
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  required
                  class="w-full p-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <!-- Password Input -->
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="Password"
                  required
                  class="w-full p-4 pr-12 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                />
                <span
                  class="material-icons absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 text-xl"
                  @click="togglePassword"
                >
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </span>
              </div>

              <!-- Confirm Password Input -->
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  class="w-full p-4 pr-12 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                />
                <span
                  class="material-icons absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 text-xl"
                  @click="toggleConfirmPassword"
                >
                  {{ showConfirmPassword ? 'visibility_off' : 'visibility' }}
                </span>
              </div>

              <!-- Create Account Button -->
              <button
                type="submit"
                class="w-full p-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-xl transition-colors duration-200 mt-6"
              >
                Create Account
              </button>
            </form>

            <!-- Login Link -->
            <p class="text-center mt-6 text-gray-600">
              Don't have an account yet?
              <router-link to="/" class="text-gray-800 font-bold hover:underline ml-1">
                Login here
              </router-link>
            </p>
          </div>

          <!-- Orange footer bar -->
          <div class="h-3 bg-orange-500"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
