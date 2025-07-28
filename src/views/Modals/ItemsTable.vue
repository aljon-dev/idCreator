<script setup lang="ts">

   import type { StudentItem } from '@/assets/types';
import { ref, computed, type PropType } from 'vue'
import { useToast } from 'vue-toast-notification'
import { uploadProfilePhoto  } from '@/assets/ItemsTableFunctions/uploadProfilePhoto'



  const toast = useToast()



 
 const { orderId, items, show } = defineProps<{
   orderId:string| number, 
  items: StudentItem[]
  show: boolean
    }>()

    const emit = defineEmits<{
        (e:'close'):void

    }>()


  const  HandleuploadProfilePhoto = async (event:Event, index:number,) =>{
      const eventTarget = event.target as HTMLInputElement;
      const file = eventTarget.files?.[0];

      if (!file) {
          toast.error('No file selected');
          return;
      }

      const response = await uploadProfilePhoto(file, orderId, index);

      if(response.status === 200){
          items[index].photo = response.msg; // Assuming response.msg contains the URL of the uploaded photo
          toast.success('Photo uploaded successfully');
    

      }else{
          toast.error(response.msg);
      }
  }


</script>



<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden">
      <div class="flex flex-row justify-between items-center p-6 border-b bg-gray-50">
        <h2 class="text-2xl font-bold text-gray-800">Student Record</h2>
        <button class="rounded bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 transition-colors" @click="emit('close')">
          Close
        </button> 
      </div>
      
      <div class="overflow-auto max-h-[calc(90vh-100px)] p-4">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b-2 border-gray-200">
              <th class="text-left px-3 py-3 font-semibold text-gray-700 min-w-[120px]">Student Name</th>
              <th class="text-left px-3 py-3 font-semibold text-gray-700 min-w-[150px]">Address</th>
              <th class="text-left px-3 py-3 font-semibold text-gray-700 min-w-[100px]">Birthday</th>
              <th class="text-left px-3 py-3 font-semibold text-gray-700 min-w-[100px]">YR/SEC/Course</th>
              <th class="text-left px-3 py-3 font-semibold text-gray-700 min-w-[120px]">LRN</th>
              <th class="text-left px-3 py-3 font-semibold text-gray-700 min-w-[120px]">Guardian</th>
              <th class="text-left px-3 py-3 font-semibold text-gray-700 min-w-[100px]">Contact</th>
              <th class="text-left px-3 py-3 font-semibold text-gray-700 w-20">Photo</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, index) in items" :key="index" class="hover:bg-gray-50">
              <td class="px-3 py-4 text-sm text-gray-900">
                <div class="break-words">{{ item['NAME OF STUDENT'] }}</div>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <div class="break-words">{{ item.ADDRESS }}</div>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ typeof item.BIRTHDAY === 'number' ? new Date((item.BIRTHDAY - 25569) * 86400 * 1000).toLocaleDateString() : item.BIRTHDAY }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <div class="break-words">{{ item['YR /SEC/ course'] }}</div>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">{{ item.LRN }}</td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <div class="break-words">{{ item['GUARDIAN/ PARENT'] }}</div>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">{{ item['CONTACT NO'] }}</td>
              <td class="px-3 py-4">
                <div v-if="item.photo" class="w-16 h-16">
                  <img :src="item.photo" alt="Student Photo" class="w-full h-full object-cover rounded border" />
                </div>
                <div v-else class="relative w-16 h-16 bg-gray-200 rounded overflow-hidden shadow group cursor-pointer hover:bg-gray-300 transition-colors border-2 border-dashed border-gray-300">
                  <i class="fa-solid fa-image text-orange-500 text-xl flex text-center mt-5 items-center justify-center h-full w-full pointer-events-none"></i>
                  <input
                    type="file"
                    accept="image/*"
                    class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    title="Upload Student Photo"
                    @change="(event) =>  HandleuploadProfilePhoto(event,index)"
    
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>