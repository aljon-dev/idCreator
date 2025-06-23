<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-sm flex flex-col justify-between">
      <div>
        <div class="pt-6 pl-6">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-[#DB551B] rounded flex items-center justify-center">
              <span class="text-white text-s font-bold">ID</span>
            </div>
            <span class="font-bold text-[#DB551B]">CREATOR</span>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <nav class="mt-6 px-6 space-y-2">
          <router-link
            to="/dashboard"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-900 hover:bg-gray-100"
            exact-active-class="bg-[#E5E7EB] text-black"
          >
            <i class="fas fa-home w-5"></i>
            <span>Dashboard</span>
          </router-link>

          <router-link
            to="/orders"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-900 hover:bg-gray-100"
            exact-active-class="bg-[#E5E7EB] text-black"
          >
            <i class="fas fa-box w-5"></i>
            <span>Order</span>
          </router-link>

          <router-link
            to="/create-order"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-900 hover:bg-gray-100"
            exact-active-class="bg-[#E5E7EB] text-black"
          >
            <i class="fas fa-plus-circle w-5"></i>
            <span>Create Order</span>
          </router-link>

          <router-link
            to="/settings"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-900 hover:bg-gray-100"
            exact-active-class="bg-[#E5E7EB] text-black"
          >
            <i class="fas fa-cog w-5"></i>
            <span>Settings</span>
          </router-link>
        </nav>
      </div>

      <!-- User Profile at bottom -->
      <div class="p-6 flex items-center space-x-3">
        <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span class="text-gray-600 text-sm">JD</span>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-900">Juan Dela Cruz</div>
          <div class="text-xs text-gray-500">juandc@gmail.com</div>
        </div>

        <!-- Three-dot menu -->
        <div
          @click="toggleDropdown"
          class="ml-5 cursor-pointer text-gray-400 select-none relative"
        >
          <i class="fas fa-ellipsis-h"></i>

          <div
            v-if="showDropdown"
            class="absolute right--20 bottom-full mb-2 w-32 bg-white border rounded shadow-lg z-20"
          >
            <button
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              @click="logout"
            >
              <i class="fas fa-sign-out-alt mr-2"></i>Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Routed Page Content -->
    <div class="flex-1 p-6 overflow-y-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const showDropdown = ref(false)
const router = useRouter()

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const logout = () => {
  alert('Logging out...')
  router.push('/')
}
</script>
