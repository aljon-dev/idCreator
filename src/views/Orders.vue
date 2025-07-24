<script setup lang="ts">
import type { FilteredOrder, Order } from '@/assets/types'
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../assets/supabase'

import { deleteOrders } from '@/assets/OrdersFunctions/deleteOrders'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

const searchTerm = ref('')
const selectedStatus = ref('')
const showModal = ref(false)
const selectedOrder = ref<Order>({} as Order)
const orders = ref<Order[]>([])

const importedEditTemplate = ref<string | null>(null)
const currentPage = ref(1)
const pageSize = 10

const loadData = async () => {
  const { data: orderData, error: loadingError } = await supabase.from('Orders').select('*')

  if (loadingError) {
    toast.error('Error loading Data')
  }

  if (orderData) {
    orders.value = orderData
  }
}

const handleDeleteOrders = async (orderId: string | number) => {
  const response = await deleteOrders(orderId)

  if (response.status === 200) {
    toast.success(response.msg)
    loadData() // Reload data after deletion
  } else {
    toast.error(response.msg)
  }
}

onMounted(() => {
  loadData()
})

const filteredOrders = computed(() => {
  return orders.value.filter((order: FilteredOrder) => {
    const matchSearch = [order.id.toString(), order.customerName].some((val: string) =>
      val.toLowerCase().includes(searchTerm.value.toLowerCase()),
    )

    const matchStatus: boolean =
      selectedStatus.value === '' || order.status === selectedStatus.value

    return matchSearch && matchStatus
  })
})

const uniqueStatuses = computed(() => [
  ...new Set(orders.value.map((order: Order) => order.status)),
])

const openModal = (order: Order) => {
  selectedOrder.value = { ...order }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveChanges = () => {
  // Find the index of the order being edited
  const index = orders.value.findIndex((o: Order) => o.id === selectedOrder.value.id)
  if (index !== -1) {
    // Update the order in the array
    orders.value[index] = { ...selectedOrder.value }
  }
  closeModal()
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

const handleEditTemplateUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      importedEditTemplate.value = e.target?.result as string
      selectedOrder.value.template = 'imported'
    }
    reader.readAsDataURL(file)
  }
}

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredOrders.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / pageSize))

const startCount = computed(() => {
  return filteredOrders.value.length === 0 ? 0 : (currentPage.value - 1) * pageSize + 1
})

const endCount = computed(() => Math.min(currentPage.value * pageSize, filteredOrders.value.length))

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="p-2 bg-gray-50 min-h-screen">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-semibold text-gray-900">Orders</h1>

      <router-link
        to="/Create-Order"
        class="flex items-center gap-2 bg-[#DB551B] text-white px-4 py-2 rounded-md hover:opacity-90 transition"
      >
        <i class="fas fa-plus"></i>
        Create Order
      </router-link>
    </div>

    <div class="border-t border-gray-300 mb-6"></div>

    <!-- Filter and Search -->
    <div class="flex flex-wrap items-center mb-6 gap-4">
      <select
        v-model="selectedStatus"
        class="mt-4 md:mt-0 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="">All Statuses</option>
        <option v-for="status in uniqueStatuses" :key="status" :value="status">
          {{ status }}
        </option>
      </select>

      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search by ID, Order Number, Name, or Tracking"
        class="w-full md:w-95 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase">
              Order ID
            </th>
            <th class="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase">
              Order No.
            </th>
            <th class="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th class="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase">Item</th>
            <th class="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase">
              Customer
            </th>
            <th class="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 text-xs">
          <tr v-for="order in paginatedOrders" :key="order.id">
            <td class="px-4 py-4 text-center whitespace-nowrap">{{ order.id }}</td>
            <td class="px-4 py-4 text-center whitespace-nowrap">{{ order.orderNumber }}</td>
            <td class="px-4 py-4 text-center whitespace-nowrap">
              <span :class="getStatusStyle(order.status)">
                {{ order.status }}
              </span>
            </td>
            <td class="px-4 py-4 text-center whitespace-nowrap">
              {{ (order.item as unknown as any[]).length }}
            </td>
            <td class="px-4 py-4 text-center whitespace-nowrap">{{ order.customerName }}</td>
            <td
              class="px-4 py-4 text-center whitespace-nowrap flex flex-row gap-4 items-center justify-center"
            >
              <button @click="openModal(order)">
                <i class="fas fa-edit text-[#DB551B] hover:text-gray-600"></i>
              </button>
              <button @click="handleDeleteOrders(order.id)">
                <i class="fa-solid fa-trash text-[#DB551B] hover:text-red-600"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Section -->
    <div
      class="flex flex-col md:flex-row justify-between items-center mt-4 px-2 text-sm text-gray-600"
    >
      <!-- Result Count -->
      <div class="mb-2 md:mb-0">
        Showing {{ startCount }} to {{ endCount }} of {{ filteredOrders.length }} results
      </div>

      <!-- Page Buttons -->
      <div class="flex items-center gap-2">
        <!-- Prev Button -->
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-2 py-1 border rounded text-gray-700 disabled:opacity-50"
        >
          &lt;
        </button>

        <!-- Page Numbers -->
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="[
            'px-3 py-1 border rounded',
            currentPage === page ? 'bg-[#DB551B] text-white' : 'text-gray-700',
          ]"
        >
          {{ page }}
        </button>

        <!-- Next Button -->
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-2 py-1 border rounded text-gray-700 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl overflow-y-auto max-h-[95vh]">
        <div class="relative mb-4">
          <h2 class="text-xl font-semibold text-center">Edit Order</h2>
          <button
            @click="closeModal"
            class="absolute top-0 right-0 text-[#DB551B] hover:text-gray-600"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="space-y-6">
          <!-- Customer Name -->
          <div>
            <h3 class="text-md font-semibold text-gray-800 mb-2">Customer Name</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Title</label>
                <select v-model="selectedOrder.title" class="mt-1 w-full border rounded px-3 py-2">
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Mrs.</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  v-model="selectedOrder.firstName"
                  type="text"
                  class="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Middle Name</label>
                <input
                  v-model="selectedOrder.middleName"
                  type="text"
                  class="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  v-model="selectedOrder.lastName"
                  type="text"
                  class="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-md font-semibold text-gray-800 mb-2">Contact Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">ID Number</label>
                <input
                  v-model="selectedOrder.idNumber"
                  type="text"
                  class="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  v-model="selectedOrder.contactNumber"
                  type="text"
                  class="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  v-model="selectedOrder.email"
                  type="email"
                  class="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          <!-- ID Info -->
          <div>
            <h3 class="text-md font-semibold text-gray-800 mb-2">ID Information</h3>
            <label class="block text-sm font-medium text-gray-700">Import Excel File</label>
            <input type="file" class="mt-1 w-full border rounded px-3 py-2" />
          </div>

          <!-- Order Info -->
          <div>
            <h3 class="text-md font-semibold text-gray-800 mb-2">Order Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Order ID</label>
                <input
                  v-model="selectedOrder.id"
                  type="text"
                  class="mt-1 w-full border rounded px-3 py-2"
                  disabled
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Order Number</label>
                <input
                  v-model="selectedOrder.orderNumber"
                  type="text"
                  class="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <select v-model="selectedOrder.status" class="mt-1 w-full border rounded px-3 py-2">
                  <option value="New order">New order</option>
                  <option value="Inproduction">In production</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Item</label>
                <input
                  v-model="selectedOrder.item"
                  type="number"
                  class="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Shipping Service</label>
                <input
                  v-model="selectedOrder.shippingService"
                  type="text"
                  class="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Tracking Code</label>
                <input
                  v-model="selectedOrder.trackingCode"
                  type="text"
                  class="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          <!-- Template Selection -->
          <div>
            <h3 class="text-md font-semibold text-gray-800 mb-2">Choose Template</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <!-- Upload -->
              <label
                class="relative border border-dashed rounded-md p-4 flex flex-col items-center justify-center hover:border-orange-400 cursor-pointer transition text-center"
                :class="
                  selectedOrder.template === 'imported' ? 'border-orange-500' : 'border-gray-300'
                "
              >
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleEditTemplateUpload"
                />
                <i class="fas fa-upload text-2xl text-gray-500 mb-2"></i>
                <span class="text-sm text-gray-600">Import Template</span>
                <div
                  v-if="selectedOrder.template === 'imported'"
                  class="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow"
                >
                  <i class="fas fa-check text-orange-500 text-sm"></i>
                </div>
              </label>

              <!-- Preview of uploaded -->
              <div
                v-if="importedEditTemplate"
                class="relative border rounded-md p-2 transition"
                :class="
                  selectedOrder.template === 'imported'
                    ? 'border-orange-500'
                    : 'border-gray-300 hover:border-orange-400'
                "
                @click="selectedOrder.template = 'imported'"
              >
                <img
                  :src="importedEditTemplate"
                  alt="Imported Template"
                  class="w-full h-24 object-cover rounded"
                />
                <p class="text-xs text-center mt-1 text-gray-600">Imported Template</p>
                <div
                  v-if="selectedOrder.template === 'imported'"
                  class="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow"
                >
                  <i class="fas fa-check text-orange-500 text-sm"></i>
                </div>
              </div>

              <!-- Default Templates -->
              <div
                v-for="n in 5"
                :key="n"
                @click="selectedOrder.template = `template${n}`"
                :class="[
                  'relative border rounded-md p-2 cursor-pointer transition',
                  selectedOrder.template === `template${n}`
                    ? 'border-orange-500'
                    : 'border-gray-300 hover:border-orange-400',
                ]"
              >
                <img
                  :src="`/templates/placeholder${n}.jpg`"
                  alt="Template"
                  class="w-full h-24 object-cover rounded"
                />
                <p class="text-xs text-center mt-1 text-gray-600">Template {{ n }}</p>
                <div
                  v-if="selectedOrder.template === `template${n}`"
                  class="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow"
                >
                  <i class="fas fa-check text-orange-500 text-sm"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action -->
        <div class="mt-6 text-right">
          <button @click="closeModal" class="px-4 py-2 rounded bg-gray-300 text-gray-700 mr-2">
            Cancel
          </button>
          <button @click="saveChanges" class="px-4 py-2 rounded bg-[#DB551B] text-white">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
