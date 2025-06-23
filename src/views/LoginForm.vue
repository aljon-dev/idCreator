<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Form data
const email = ref<string>('')
const password = ref<string>('')
const showPassword = ref<boolean>(false)

const router = useRouter()

// Methods
const togglePassword = (): void => {
  showPassword.value = !showPassword.value
}

const handleLogin = (): void => {
  console.log('Logging in with:', email.value, password.value)
  // TODO: Add login API integration here
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
          <span class="text-orange-500">MAKE IT WITH COMPANY </span>
        </h1>
        <p class="text-lg max-w-md leading-relaxed">
          Create and manage secure IDs. Fast, smart, and simple.
        </p>
      </div>

      <!-- Form Card Section -->
      <div class="flex justify-center">
        <div
          class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border-t-8 border-b-8 border-orange-500"
        >
          <!-- Form content -->
          <div class="p-8">
            <!-- Logo -->
            <div class="text-center mb-6">
              <div class="text-orange-500 text-2xl font-bold mb-2">du ID CREATOR</div>
            </div>

            <!-- Form title -->
            <h2 class="text-2xl font-bold text-center mb-8 text-gray-800">Login</h2>

            <!-- Form -->
            <form @submit.prevent="handleLogin" class="space-y-5">
              <!-- Email Input -->
              <div>
                <input
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  class="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <!-- Password Input -->
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="Password"
                  class="w-full p-4 pr-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
                <span
                  class="material-icons absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 text-xl"
                  @click="togglePassword"
                >
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </span>
              </div>

              <!-- Forgot Password Link -->
              <div class="text-right mb-4">
                <router-link
                  to="/forgot-password"
                  class="text-sm text-gray-800 font-bold hover:text-gray-600 hover:underline"
                >
                  Forgot password?
                </router-link>
              </div>

              <!-- Login Button -->
              <router-link to="/Dashboard" class="text-gray">
                <button
                  class="w-full p-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg transition-colors duration-200 mt-6"
                >
                  Login
                </button>
              </router-link>
            </form>

            <!-- Sign Up Link -->
            <p class="text-center mt-6 text-gray-600">
              Don't have an account yet?
              <router-link to="/signup" class="text-gray-800 font-bold hover:underline ml-1">
                Sign up here
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
