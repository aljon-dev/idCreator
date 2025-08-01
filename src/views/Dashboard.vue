<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { supabase } from '@/assets/supabase'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

const stats = reactive({
  submitted: 0,
  pending: 0,
  printed: 0,
})

const orders = ref<any[]>([])

const loadData = async () => {
  const { data: orderData, error: loadingError } = await supabase.from('Orders').select('*')

  if (loadingError) {
    toast.error('Error loading Data')
  }

  if (orderData) {
    orders.value = orderData
  }
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'New order':
      return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs'
    case 'Inproduction':
      return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs'
    case 'Shipped':
      return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs'
    case 'Cancelled':
      return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs'
    case 'Rejected':
      return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs'
    case 'Draft':
      return 'bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs'
    default:
      return ''
  }
}

const getShippingServiceStyle = (service: 'Standard' | 'Priority' | 'Express') => {
  const style = {
    Standard: 'text-purple-600',
    Priority: 'text-blue-600',
    Express: 'text-green-600',
  }
  return style[service] || ''
}

const getShippingDot = (service: 'Standard' | 'Priority' | 'Express') => {
  const colors = {
    Standard: 'bg-purple-500',
    Priority: 'bg-blue-500',
    Express: 'bg-green-500',
  }
  return colors[service] || 'bg-gray-500'
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div>
    <!-- Main Content -->
    <div class="flex-1 p-8">
      <h1 class="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>

      <!-- Divider -->
      <div class="border-t border-gray-300 mb-6"></div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="text-center">
            <div class="text-xl font-bold text-gray-900 mb-2">SUBMITTED</div>
            <div class="text-xl font-bold text-gray-900">ORDERS</div>
            <div class="text-3xl font-bold text-gray-900 mt-4">{{ stats.submitted }}</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="text-center">
            <div class="text-xl font-bold text-gray-900 mb-2">PENDING</div>
            <div class="text-xl font-bold text-gray-900">ORDERS</div>
            <div class="text-3xl font-bold text-gray-900 mt-4">{{ stats.pending }}</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="text-center">
            <div class="text-xl font-bold text-gray-900 mb-2">PRINTED</div>
            <div class="text-xl font-bold text-gray-900">ORDERS</div>
            <div class="text-3xl font-bold text-gray-900 mt-4">{{ stats.printed }}</div>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-100">
              <tr>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order Number
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer Name
                </th>
              </tr>
            </thead>
            <tbody v-if="orders.length > 0" class="bg-white divide-y divide-gray-200">
              <tr v-for="(order, index) in orders" :key="index" class="bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {{ order.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {{ order.orderNumber }}
                </td>
                <td class="px-6 py-4 text-center whitespace-nowrap">
                  <span :class="getStatusStyle(order.status)">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                  {{ order.item.length ?? 'No Items' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {{ order.customerName }}
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" class="text-center py-8 text-gray-500">No orders found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- See More Button -->
      <div class="mt-6 text-center">
        <router-link
          to="/Orders"
          class="inline-block bg-[#DB551B] text-white font-semibold px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          See More
        </router-link>
      </div>
    </div>
  </div>
</template>
