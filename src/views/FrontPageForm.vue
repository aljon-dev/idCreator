<script setup lang="ts">
import {ref} from 'vue';


const formData = ref({
    fullName: '',
    school:'',
    grade: '',
    section:'',
    address: {
            street: '',
            city: '',
            zipCode: '',
            barangay: '',
    },
    photo: null as File | null,
    signature: null as File | null

});



const photoPreview  = ref<string | null>(null);
const signaturePreview = ref<string | null> (null);


const handlePhotoUpload = (event:Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];


    if(file){
        formData.value.photo = file;
        const reader = new FileReader();

        reader.onload = (e) => {
            photoPreview.value = e.target?.result as string;
        }
        reader.readAsDataURL(file);
    }


}



const handleSignatureUpload = (event:Event)=>{
    const target = event.target as HTMLInputElement;
     const file = target.files?.[0];

     if(file){
        formData.value.signature = file;
        const reader = new FileReader();

        reader.onload = (e) =>{
                signaturePreview.value  = e.target?.result as string;
        }
        reader.readAsDataURL(file);
     }
}

const removePhoto = () => {
  formData.value.photo = null;
  photoPreview.value = null;
};

const removeSignature = () => {
  formData.value.signature = null;
  signaturePreview.value = null;
};




</script>


<template>
  <div class="min-h-screen bg-[url('@/assets/background-ls.png')] bg-cover bg-center">
    <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-90"></div>
        <div class="relative px-4 py-10 bg-white/95 backdrop-blur-sm shadow-lg sm:rounded-3xl sm:p-20">
          <div class="max-w-md mx-auto">
            <div class="text-center">
              <h1 class="text-2xl font-semibold text-gray-900 mb-6">ID Registration Form</h1>
            </div>
            
            <form  class="space-y-6">


             

              <!-- Photo Upload Section -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  Upload Photo *
                </label>
                <div class="flex items-center justify-center w-full">
                  <div v-if="!photoPreview" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500">
                        <span class="font-semibold">Click to upload</span> your photo
                      </p>
                      <p class="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                    </div>
                    <input @change="handlePhotoUpload" type="file" accept="image/*" class="hidden" ref="photoInput">
                  </div>
                  <div v-else class="relative">
                    <img :src="photoPreview" alt="Photo preview" class="w-32 h-32 object-cover rounded-lg border-2 border-gray-300">
                    <button @click="removePhoto" type="button" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                      ×
                    </button>
                  </div>
                </div>
                <div v-if="!photoPreview" class="text-center">
                  <button @click="($refs.photoInput as HTMLInputElement).click()" type="button" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Browse Files
                  </button>
                </div>
              </div>

                  <div class="space-y-2">
                <label for="School Name" class="block text-sm font-medium text-gray-700">
                 School Name
                </label>
                <input 
                  v-model="formData.school"
                  type="text" 
         
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter School name"
                >
              </div>

                    <div class="space-y-2">
                <label for="Grade " class="block text-sm font-medium text-gray-700">
                 Grade
                </label>
                <input 
                  v-model="formData.school"
                  type="text" 
             
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Grade level"
                >
              </div>


                  <div class="space-y-2">
                <label for="School Name" class="block text-sm font-medium text-gray-700">
                 Section 
                </label>
                <input 
                  v-model="formData.school"
                  type="text" 
             
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Section"
                >
              </div>



              <!-- Full Name Section -->
              <div class="space-y-2">
                <label for="fullName" class="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input 
                  v-model="formData.fullName"
                  type="text" 
                  id="fullName"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                >
              </div>

              <!-- E-Signature Upload Section -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  Upload E-Signature *
                </label>
                <div class="flex items-center justify-center w-full">
                  <div v-if="!signaturePreview" class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div class="flex flex-col items-center justify-center pt-3 pb-4">
                      <svg class="w-6 h-6 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                      <p class="text-sm text-gray-500">
                        <span class="font-semibold">Click to upload</span> signature
                      </p>
                    </div>
                    <input @change="handleSignatureUpload" type="file" accept="image/*" class="hidden" ref="signatureInput">
                  </div>
                  <div v-else class="relative">
                    <img :src="signaturePreview" alt="Signature preview" class="w-40 h-20 object-contain rounded-lg border-2 border-gray-300 bg-white">
                    <button @click="removeSignature" type="button" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                      ×
                    </button>
                  </div>
                </div>
                <div v-if="!signaturePreview" class="text-center">
                  <button @click="($refs.signatureInput as HTMLInputElement).click()" type="button" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Browse Signature Files
                  </button>
                </div>
              </div>

              <!-- Address Section -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900">Address Information</h3>
                
                <div class="space-y-2">
                  <label for="street" class="block text-sm font-medium text-gray-700">
                    Street Address *
                  </label>
                  <input 
                    v-model="formData.address.street"
                    type="text" 
                    id="street"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your street address"
                  >
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="city" class="block text-sm font-medium text-gray-700">
                      City *
                    </label>
                    <input 
                      v-model="formData.address.city"
                      type="text" 
                      id="city"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="City"
                    >
                  </div>

                  <div class="space-y-2">
                    <label for="state" class="block text-sm font-medium text-gray-700">
                     Barangay
                    </label>
                    <input 
                      v-model="formData.address.barangay"
                      type="text" 
                      id="state"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="State"
                    >
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="zipCode" class="block text-sm font-medium text-gray-700">
                      ZIP/Postal Code *
                    </label>
                    <input 
                      v-model="formData.address.zipCode"
                      type="text" 
                      id="zipCode"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="ZIP Code"
                    >
                  </div>

                 
                </div>
              </div>

              <!-- Submit Button -->
              <div class="pt-4">
                <button 
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>