<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-semibold text-center mb-6">Review Order</h2>

    <div class="border-t border-gray-300 mb-6"></div>

    <div class="space-y-6 max-w-6xl mx-auto">
      <!-- Basic Info -->
      <div>
        <h3 class="text-md font-semibold text-gray-800 mb-2">Order Summary</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <p><strong>Order ID:</strong> {{ order.id }}</p>
          <p><strong>Order Number:</strong> {{ order.orderNumber }}</p>
          <p><strong>Status:</strong> {{ order.status }}</p>
          <p><strong>Shipping Service:</strong> {{ order.shippingService }}</p>
          <p><strong>Tracking Code:</strong> {{ order.trackingCode }}</p>
          <p><strong>Total IDs:</strong> {{ order.users.length }}</p>
        </div>
      </div>

      <!-- Bulk ID Cards Preview -->
      <div>
        <h3 class="text-md font-semibold text-gray-800 mb-4">ID Print Preview</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 print-view">
          <div
            v-for="(user, index) in order.users"
            :key="index"
            class="border rounded shadow-sm overflow-hidden bg-white w-full aspect-[5/3] relative"
          >
            <img
              :src="order.template === 'imported' ? order.importedTemplate : `/templates/placeholder${order.template}.jpg`"
              alt="ID Background"
              class="absolute top-0 left-0 w-full h-full object-cover opacity-60"
            />
            <div class="relative z-10 p-2 text-xs text-gray-800">
              <p><strong>{{ user.title }} {{ user.firstName }} {{ user.lastName }}</strong></p>
              <p>ID No: {{ user.idNumber }}</p>
              <p>Age: {{ calculateAge(user.birthdate) }}</p>
              <p>Contact: {{ user.contactNumber }}</p>
              <p>Email: {{ user.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="mt-6 text-right">
        <router-link to="/create-order">
          <button class="px-4 py-2 mr-2 rounded bg-gray-300 text-gray-700">Back</button>
        </router-link>
        <button @click="confirmOrder" class="px-4 py-2 rounded bg-[#DB551B] text-white">Confirm & Print</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const order = ref({
  id: '',
  orderNumber: '',
  status: '',
  shippingService: '',
  trackingCode: '',
  template: null,
  importedTemplate: null,
  users: []
})

onMounted(() => {
  const saved = localStorage.getItem('reviewOrder')
  if (saved) {
    order.value = JSON.parse(saved)
  } else {
    // 🧪 Practice Data
    order.value = {
      id: 'ORD1024',
      orderNumber: 'BULK-2025-004',
      status: 'Inproduction',
      shippingService: 'LBC Express',
      trackingCode: 'LBC987654321',
      template: 3,
      users: [
        {
          title: 'Mr.',
          firstName: 'Adrian',
          lastName: 'Lopez',
          birthdate: '1999-08-12',
          idNumber: 'ID-A001',
          contactNumber: '09181234567',
          email: 'adrian.lopez@example.com'
        },
        {
          title: 'Ms.',
          firstName: 'Clarisse',
          lastName: 'Reyes',
          birthdate: '2002-02-24',
          idNumber: 'ID-A002',
          contactNumber: '09184561234',
          email: 'clarisse.reyes@example.com'
        },
        {
          title: 'Mr.',
          firstName: 'Noel',
          lastName: 'Tan',
          birthdate: '1988-11-01',
          idNumber: 'ID-A003',
          contactNumber: '09981231234',
          email: 'noel.tan@example.com'
        },
        {
          title: 'Mrs.',
          firstName: 'Mira',
          lastName: 'Castro',
          birthdate: '1995-07-18',
          idNumber: 'ID-A004',
          contactNumber: '09391231234',
          email: 'mira.castro@example.com'
        },
        {
          title: 'Mr.',
          firstName: 'Leo',
          lastName: 'Santos',
          birthdate: '2000-01-01',
          idNumber: 'ID-A005',
          contactNumber: '09170001122',
          email: 'leo.santos@example.com'
        }
      ]
    }
  }
})

const calculateAge = (birthdate) => {
  const birth = new Date(birthdate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

const confirmOrder = () => {
  alert('Bulk order confirmed! Ready for printing.')
  console.log(order.value)
}
</script>

<style scoped>
.print-view {
  page-break-inside: avoid;
}
</style>

