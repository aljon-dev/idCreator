<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { setOrders } from '@/assets/OrdersFunctions/createOrders'
import * as XLSX from 'xlsx'

const router = useRouter()

const toast = useToast()

const date = new Date()

const randomUID = Date.now()

const FileImage = ref<File>();

const newOrder = ref({
  title: '',
  firstName: '',
  middleName: '',
  lastname: '',
  contactNumber: '',
  email: '',
  orderNumber: randomUID,
  status: 'New order',
  item: [] as Record<string, any>,
  section:'',
  e_signature:'',
  teacher_name:'',
  princial:''
})




  const handleInputImage = async (event:Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      FileImage.value = file;


  }


const handleExcelImport = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  try {
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    const safeJsonData = JSON.parse(JSON.stringify(jsonData))

    if (jsonData.length) {
      newOrder.value.item = safeJsonData

      console.log(jsonData)

      toast.success('Successfully Inserted the Data ')
    }
  } catch (e) {
    toast.error('Failed to insert the Excel File ')
  }
}

const submitOrders = async () => {

  if(!FileImage.value){
    toast.error('Please Upload your e-signature Image ');
    return;
  }

  const result = await setOrders(newOrder.value,FileImage.value)

  if (result.status == 200) {
    toast.success(result.msg)

  newOrder.value = {
  title: '',
  firstName: '',
  middleName: '',
  lastname: '',
  contactNumber: '',
  email: '',
  orderNumber: Date.now(), // Regenerate order number
  status: 'New order',
  item: [],
  section: '',
  e_signature: '',
  teacher_name: '',
  princial: ''
}

 FileImage.value = undefined;
    

  
  } else {
    toast.error(result.msg)
  }
  


}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-semibold text-center mb-6">Create Order</h2>

    <div class="border-t border-gray-300 mb-6"></div>

    <div class="space-y-6 max-w-5xl mx-auto">
      <!-- Customer Name Section -->
      <div>
        <h3 class="text-md font-semibold text-gray-800 mb-2">School Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">School Name</label>
            <input
              class="mt-1 w-full border rounded px-3 py-2"
              type="text"
              v-model="newOrder.title"
            />
          </div>

             <div>
            <label class="block text-sm font-medium text-gray-700">Section|Grade</label>
            <input
              v-model="newOrder.section"
              type="text"
              class="mt-1 w-full border rounded px-3 py-2"
            />
          </div>

           <div>
            <label class="block text-sm font-medium text-gray-700">Principal</label>
            <input
              v-model="newOrder.princial"
              type="text"
              class="mt-1 w-full border rounded px-3 py-2"
            />
          </div>

           <div>
            <label class="block text-sm font-medium text-gray-700">Adviser</label>
            <input
              v-model="newOrder.teacher_name"
              type="text"
              class="mt-1 w-full border rounded px-3 py-2"
            />
          </div>




          
          
        </div>
      </div>

      <!-- Contact Info Section -->
      <div>
        <h3 class="text-md font-semibold text-gray-800 mb-2">User Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              v-model="newOrder.firstName"
              type="text"
              class="mt-1 w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Middle Name</label>
            <input
              v-model="newOrder.middleName"
              type="text"
              class="mt-1 w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              v-model="newOrder.lastname"
              type="text"
              class="mt-1 w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              v-model="newOrder.contactNumber"
              type="text"
              class="mt-1 w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              v-model="newOrder.email"
              type="email"
              class="mt-1 w-full border rounded px-3 py-2"
            />
          </div>

        
        </div>
      </div>

      <!-- ID Info Section -->
      <div>
        <h3 class="text-md font-semibold text-gray-800 mb-2">ID Information</h3>
        <label class="block text-sm font-medium text-gray-700">Import Excel File</label>
        <input
          type="file"
          class="mt-1 w-full border rounded px-3 py-2"
          accept=".xlsx, .xls"
          @change="handleExcelImport"
        />
      </div>

      <div>
        <h3 class="text-md font-semibold text-gray-800 mb-2">E-Signature </h3>
         <label class="block text-sm font-medium text-gray-700">Choose image file</label>
         <input
          type="file"
          class="mt-1 w-full border rounded px-3 py-2"
          accept="image/*"
          @change="handleInputImage"
         
        />
      </div>


      

      <!-- Order Info Section -->

      <!-- Template Selection -->
      

      <!-- Review Button -->
      <div class="mt-6 text-right">
        <router-link to="/orders">
          <button class="px-4 py-2 mr-2 rounded bg-gray-300 text-gray-700">Cancel</button>
        </router-link> 
        <button @click="submitOrders" class="px-4 py-2 rounded bg-[#DB551B] text-white">
          Confirm Order
        </button>
      </div>
    </div>
  </div>
</template>
