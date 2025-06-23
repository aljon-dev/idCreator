<template>
  <div class="p-6 bg-gray-50 min-h-screen">
      <h2 class="text-2xl font-semibold text-center mb-6">Settings</h2>

      <div class="border-t border-gray-300 mb-6"></div>

      <!-- Profile Picture Centered -->
      <div class="flex flex-col items-center mb-6">
        <div class="relative w-24 h-24">
          <img
            :src="profile.picture || defaultAvatar"
            alt=""
            class="w-24 h-24 object-cover rounded-full border border-gray-300"
          />
          <label
            for="profilePicInput"
            class="absolute bottom-0 right-0 bg-white border border-gray-300 p-1.5 rounded-full cursor-pointer hover:bg-orange-50 transition"
          >
            <i class="fas fa-camera text-sm text-gray-600"></i>
            <input
              id="profilePicInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleProfilePic"
            />
          </label>
        </div>
      </div>

      <!-- Name + Email Fields -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            v-model="profile.name"
            type="text"
            class="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
                v-model="profile.email"
                type="email"
                class="w-full border rounded px-3 py-2"
            />

            <!-- Email Verification Status -->
            <div class="text-xs mt-1 text-right">
                <span v-if="emailVerified" class="text-green-600">✔ Email Verified</span>
                <span v-else class="text-orange-500">✖ Not Verified</span>
            </div>

            <!-- Button Aligned Bottom Right -->
            <div class="flex justify-end mt-1">
                <button
                v-if="!emailVerified"
                @click="verifyEmail"
                class="text-sm text-orange-600 hover:underline"
                >
                Send Verification Email
                </button>
            </div>
        </div>


      </div>

      <!-- Change Password -->
      <div class="mt-6">
        <h3 class="text-lg font-medium text-gray-800 mb-4">Change Password</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              v-model="passwords.current"
              type="password"
              class="mt-1 w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">New Password</label>
            <input
              v-model="passwords.new"
              type="password"
              class="mt-1 w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        
        <div class="mt-6 flex justify-end">
            <button
            class="bg-[#DB551B] text-white px-4 py-2 rounded hover:opacity-90 transition" @click="changePassword"
            >
            Save Changes
            </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const defaultAvatar = '/avatar-default.png' // Replace with your cute default avatar path

const profile = ref({
  name: 'Angeline Jores',
  email: 'angeline@email.com',
  picture: null,
})

const emailVerified = ref(false)

const passwords = ref({
  current: '',
  new: '',
})

function handleProfilePic(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = () => {
      profile.value.picture = reader.result
    }
    reader.readAsDataURL(file)
  }
}

function verifyEmail() {
  alert('Verification email sent!')
  emailVerified.value = true
}

function changePassword() {
  if (passwords.value.current && passwords.value.new) {
    alert('Password changed successfully!')
    passwords.value.current = ''
    passwords.value.new = ''
  } else {
    alert('Please fill in both password fields.')
  }
}
</script>
