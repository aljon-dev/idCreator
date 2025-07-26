<script setup lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { uploadTemplates } from '@/assets/TemplatesFunctions/UploadTemplate'
import { useToast } from 'vue-toast-notification'

const toast = useToast();

const activeField = ref<string | null>(null)
const editingSide = ref<'front' | 'back'>('front')

const frontFile = ref<File | null>(null)
const backFile = ref<File | null>(null)

const frontImage = ref<string | undefined>(undefined)
const backImage = ref<string | undefined>(undefined)

const frontFields = ref([
  { key: 'name', label: 'Fullname', top: 100, left: 100, width: 120, height: 20 },
  { key: 'lrn', label: 'Lrn', top: 150, left: 100, width: 120, height: 20 },
  { key: 'photo', label: 'Photo', top: 200, left: 100, width: 120, height: 120 },
  { key: 'signature', label: 'Signature', top: 180, left: 100, width: 100, height: 30 },
])

const backFields = ref([
  { key:'address',label:'Address', top: 100, left: 100, width: 120, height: 20 },
  { key:'guardian',label:'Guardian', top: 150, left: 100, width: 120, height: 20 },
  { key:'contact',label:'Contact', top: 200, left: 100, width: 120, height: 20 },
])


const uploadImageFront = (event:Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if(!file) return;
  const preview = URL.createObjectURL(file);
 
    frontFile.value = file;
    frontImage.value = preview;
  
}

const uploadImageBack = (event:Event) => {
   const file = (event.target as HTMLInputElement).files?.[0];
   if(!file) return ;
   const preview = URL.createObjectURL(file);
   backFile.value = file;
    backImage.value = preview;



}



const saveLayout = async () => {
  if (frontFile.value && backFile.value) {
    const response = await uploadTemplates(frontFile.value, backFile.value, frontFields.value, backFields.value);
    if(response.status === 200){
      toast.success('Template saved successfully!');
      frontFile.value = null;
      backFile.value = null;
      frontImage.value = undefined;
      backImage.value = undefined;
    } else {
      toast.error('Failed to save template: ' + response.msg);
    }
  } else {
    toast.error('Please upload both front and back images before saving.');

  }
}
</script>

<template>
  <div class="mt-4 flex gap-4 items-center">
  <div>
    <label class="block mb-1 font-medium text-sm">Front Image </label>
    <input type="file" accept="image/*" @change="uploadImageFront($event)" class="border rounded p-2" />
  </div>  
  <div>
     <label class="block mb-1 font-medium text-sm"> Back Image</label>
     <input type="file" accept="image/*" @change="uploadImageBack($event, )" class="border rounded p-2" />
  </div> 

  
 

  </div>
  <div class="mx-auto p-6 w-full">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">ID Template Designer</h1>
      <button  @click="saveLayout" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
        Save Layout
      </button>
    </div>
    

    <div class="mt-4 flex gap-4">
      <button
        @click="editingSide = 'front'"
        :class="editingSide === 'front' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'"
        class="px-4 py-2 rounded"
      >
        Front
      </button>
      <button
        @click="editingSide = 'back'"
        :class="editingSide === 'back' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'"
        class="px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
   <div class="relative border border-gray-300 shadow-md w-[212px] h-[340px] mx-auto bg-white">
      <img
        :src="editingSide === 'front' ? frontImage : backImage"
        class="absolute w-full h-full object-cover z-0"
      />

      <vue3-draggable-resizable
        v-for="field in editingSide === 'front' ? frontFields : backFields"
        :key="field.key"
        v-model:x="field.left"
        v-model:y="field.top"
        :w="field.width"
        :h="field.height"
        :active="activeField === field.key"
        @activated="() => (activeField = field.key)"
        class="z-10 bg-white/80 text-xs text-center border border-blue-500 font-medium flex items-center justify-center cursor-move"
      >
        {{ field.label }}
      </vue3-draggable-resizable>
    </div>
  </div>
</template>
