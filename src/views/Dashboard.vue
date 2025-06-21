<script setup lang="js">
import { ref, reactive } from 'vue'

const stats = reactive({
  submitted: 80,
  pending: 80,
  printed: 80,
})

const orders = ref([
  {
    id: 59217,
    orderNumber: '59217342',
    status: 'New order',
    item: 1,
    customerName: 'Cody Fisher',
    shippingService: 'Standard',
    trackingCode: '940010010936113003113',
  },
  {
    id: 59213,
    orderNumber: '59217343',
    status: 'Inproduction',
    item: 2,
    customerName: 'Kristin Watson',
    shippingService: 'Priority',
    trackingCode: '940010010936113003113',
  },
  {
    id: 59219,
    orderNumber: '59217344',
    status: 'Shipped',
    item: 12,
    customerName: 'Esther Howard',
    shippingService: 'Express',
    trackingCode: '940010010936113003113',
  },
  {
    id: 59220,
    orderNumber: '59217345',
    status: 'Cancelled',
    item: 22,
    customerName: 'Jenny Wilson',
    shippingService: 'Express',
    trackingCode: '940010010936113003113',
  },
  {
    id: 59223,
    orderNumber: '59217346',
    status: 'Rejected',
    item: 32,
    customerName: 'John Smith',
    shippingService: 'Express',
    trackingCode: '940010010936113003113',
  },
  {
    id: 59182,
    orderNumber: '59217346',
    status: 'Draft',
    item: 41,
    customerName: 'Cameron Williamson',
    shippingService: 'Express',
    trackingCode: '940010010936113003113',
  },
  {
    id: 59182,
    orderNumber: '59217346',
    status: 'Draft',
    item: 41,
    customerName: 'Cameron Williamson',
    shippingService: 'Express',
    trackingCode: '940010010936113003113',
  },
  {
    id: 59182,
    orderNumber: '59217347',
    status: 'Draft',
    item: 41,
    customerName: 'Cameron Williamson',
    shippingService: 'Priority',
    trackingCode: '940010010936113003113',
  },
  {
    id: 59182,
    orderNumber: '59217347',
    status: 'Draft',
    item: 41,
    customerName: 'Cameron Williamson',
    shippingService: 'Express',
    trackingCode: '940010010936113003113',
  },
])

const getStatusStyle = (status) => {
  switch (status) {
    case 'New order':
      return 'bg-blue-100 text-blue-800'
    case 'Inproduction':
      return 'bg-yellow-100 text-yellow-800'
    case 'Shipped':
      return 'bg-green-100 text-green-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    case 'Rejected':
      return 'bg-gray-100 text-gray-800'
    case 'Draft':
      return 'bg-purple-100 text-purple-800'
    default:
      return ''
  }
}

const getShippingServiceStyle = (service) => {
  const style = {
    Standard: 'text-purple-600',
    Priority: 'text-blue-600',
    Express: 'text-green-600',
  }
  return style[service] || ''
}

const getShippingDot = (service) => {
  const colors = {
    Standard: 'bg-purple-500',
    Priority: 'bg-blue-500',
    Express: 'bg-green-500',
  }
  return colors[service] || 'bg-gray-500'
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!--- Side Bar -->

    <div class="w-64 bg-white shadow-md">
      <div class="p-6">
        <div class="flex items-center mb-6">
          <div class="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
            <span class="text-white text-xs font-bold"> ID </span>
          </div>
          <span class="font-semibold text-gray-900">ID CREATOR</span>
        </div>
      </div>

      <!-- Fixed user profile section -->
      <div class="flex ml-10 items-center space-x-3 mb-6">
        <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span class="text-gray-600 text-sm">JD</span>
        </div>
        <div class="flex-1">
          <div class="text-sm font-medium text-gray-900">Juan Dela Cruz</div>
          <div class="text-xs text-gray-500">JuanDC@gmail.com</div>
        </div>
        <i class="fas fa-ellipsis-h text-gray-400"></i>
      </div>

      <nav class="mt-6">
        <div class="px-6 space-y-2">
          <a
            href="#"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-100 text-gray-900"
          >
            <i class="fas fa-home w-5"> </i>
            <span class="text-sm font-medium">Dashboard</span>
          </a>

          <a
            href="#"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-100 text-gray-900"
          >
            <i class="fas fa-box w-5"> </i>
            <span class="text-sm font-medium">Order</span>
          </a>

          <a
            href="#"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-100 text-gray-900"
          >
            <i class="fas fa-plus-circle w-5"> </i>
            <span class="text-sm font-medium">Create Order</span>
          </a>

          <a
            href="#"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-100 text-gray-900"
          >
            <i class="fas fa-cog w-5"> </i>
            <span class="text-sm font-medium">Setting </span>
          </a>
        </div>
      </nav>
    </div>
    <div class="flex-1 p-8">
      <h1 class="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div class="bg-gray-100 rounded-lg p-6">
          <div class="text-center">
            <div class="text-xl font-bold text-gray-900 mb-2">SUBMITTED</div>
            <div class="text-xl font-bold text-gray-900">ORDERS</div>
            <div class="text-3xl font-bold text-gray-900 mt-4">{{ stats.submitted }}</div>
          </div>
        </div>

        <div class="bg-gray-100 rounded-lg p-6">
          <div class="text-center">
            <div class="text-xl font-bold text-gray-900 mb-2">SUBMITTED</div>
            <div class="text-xl font-bold text-gray-900">ORDERS</div>
            <div class="text-3xl font-bold text-gray-900 mt-4">{{ stats.pending }}</div>
          </div>
        </div>

        <div class="bg-gray-100 rounded-lg p-6">
          <div class="text-center">
            <div class="text-xl font-bold text-gray-900 mb-2">SUBMITTED</div>
            <div class="text-xl font-bold text-gray-900">ORDERS</div>
            <div class="text-3xl font-bold text-gray-900 mt-4">{{ stats.printed }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order Number
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer Name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Shipping Service
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tracking Code
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(order, index) in orders" :key="index" class="bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ order.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ order.orderNumber }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusStyle(order.status)">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ order.item }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ order.customerName }}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div class="flex items-center">
                    <div
                      :class="getShippingDot(order.shippingService)"
                      class="w-2 h-2 rounded-full mr-2"
                    ></div>
                    <span :class="getShippingServiceStyle(order.shippingService)">
                      {{ order.shippingService }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div class="flex items-center justify-between">
                    {{ order.trackingCode }}
                    <i class="fas fa-external-link-alt text-gray-400 cursor-pointer"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <i class="fas fa-external-link-alt text-gray-400 cursor-pointer"></i>
      </div>
    </div>
  </div>
</template>
