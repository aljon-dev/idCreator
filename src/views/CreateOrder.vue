<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-semibold text-center mb-6">Create Order</h2>

    <div class="border-t border-gray-300 mb-6"></div>

    <div class="space-y-6 max-w-5xl mx-auto">
      <!-- Customer Name Section -->
      <div>
        <h3 class="text-md font-semibold text-gray-800 mb-2">Customer Name</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <select v-model="newOrder.title" class="mt-1 w-full border rounded px-3 py-2">
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input v-model="newOrder.firstName" type="text" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Middle Name</label>
            <input v-model="newOrder.middleName" type="text" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="newOrder.lastName" type="text" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
        </div>
      </div>

      <!-- Contact Info Section -->
      <div>
        <h3 class="text-md font-semibold text-gray-800 mb-2">Contact Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">ID Number</label>
            <input v-model="newOrder.idNumber" type="text" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Contact Number</label>
            <input v-model="newOrder.contactNumber" type="text" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Email Address</label>
            <input v-model="newOrder.email" type="email" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
        </div>
      </div>

      <!-- ID Info Section -->
      <div>
        <h3 class="text-md font-semibold text-gray-800 mb-2">ID Information</h3>
        <label class="block text-sm font-medium text-gray-700">Import Excel File</label>
        <input type="file" class="mt-1 w-full border rounded px-3 py-2" />
      </div>

      <!-- Order Info Section -->
  

      <!-- Template Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Choose Template</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <!-- Import Template -->
          <label
            class="relative border border-dashed rounded-md p-4 flex flex-col items-center justify-center hover:border-orange-400 cursor-pointer transition text-center"
            :class="selectedTemplate === 'imported' ? 'border-orange-500' : 'border-gray-300'"
          >
            <input type="file" accept="image/*" class="hidden" @change="handleImportTemplate" />
            <i class="fas fa-upload text-2xl text-gray-500 mb-2"></i>
            <span class="text-sm text-gray-600">Import Template</span>
            <div v-if="selectedTemplate === 'imported'" class="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow">
              <i class="fas fa-check text-orange-500 text-sm"></i>
            </div>
          </label>

          <!-- Imported Template Preview -->
          <div
            v-if="importedTemplate"
            class="relative border rounded-md p-2 transition"
            :class="selectedTemplate === 'imported' ? 'border-orange-500' : 'border-gray-300 hover:border-orange-400'"
            @click="selectTemplate('imported')"
          >
            <img :src="importedTemplate" alt="Imported Template" class="w-full h-24 object-cover rounded" />
            <p class="text-xs text-center mt-1 text-gray-600">Imported Template</p>
            <div v-if="selectedTemplate === 'imported'" class="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow">
              <i class="fas fa-check text-orange-500 text-sm"></i>
            </div>
          </div>

          <!-- Placeholder Templates -->
          <div
            v-for="n in 5"
            :key="n"
            @click="selectTemplate(n)"
            :class="[
              'relative border rounded-md p-2 cursor-pointer transition',
              selectedTemplate === n ? 'border-orange-500' : 'border-gray-300 hover:border-orange-400'
            ]"
          >
            <img :src="`/templates/placeholder${n}.jpg`" alt="Template Preview" class="w-full h-24 object-cover rounded" />
            <p class="text-xs text-center mt-1 text-gray-600">Template {{ n }}</p>
            <div v-if="selectedTemplate === n" class="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow">
              <i class="fas fa-check text-orange-500 text-sm"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Review Button -->
      <div class="mt-6 text-right">
        <router-link to="/orders">
          <button class="px-4 py-2 mr-2 rounded bg-gray-300 text-gray-700">Cancel</button>
        </router-link>
        <button @click="goToReview" class="px-4 py-2 rounded bg-[#DB551B] text-white">Review Order</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const newOrder = ref({
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  idNumber: '',
  contactNumber: '',
  email: '',
  orderNumber: '',
  id: '',
  status: '',
  item: '',
  shippingService: '',
  trackingCode: '',
  size: '',
  template: '',
})

const selectedTemplate = ref(null)
const importedTemplate = ref<string | null>(null)

const handleImportTemplate = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target?.files?.[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = () => {
      importedTemplate.value = reader.result
      selectedTemplate.value = 'imported'
    }
    reader.readAsDataURL(file)
  }
}

const selectTemplate = (template) => {
  selectedTemplate.value = template
}

const goToReview = () => {
  const orderData = { ...newOrder.value, template: selectedTemplate.value, importedTemplate: importedTemplate.value }
  localStorage.setItem('reviewOrder', JSON.stringify(orderData))
  router.push('/review-order')
}
</script>

