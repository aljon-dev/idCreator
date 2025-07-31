<script setup lang="ts">
import { onMounted, onRenderTracked, ref, watch } from 'vue'
import { supabase } from '../assets/supabase'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

const SelectedSection = ref<string>('Select Grade | Section')
const SelectedSchool = ref<string>('Select School')

const loadSection = ref<any[]>([])
const loadSchool = ref<any[]>([])

const formData = ref({
  fullName: '',
  school: '',
  grade: '',
  section: '',
  address: {
    street: '',
    city: '',
    zipCode: '',
    barangay: '',
  },
  photo: null as File | null,
  signature: null as File | null,
})

const photoPreview = ref<string | null>(null)
const signaturePreview = ref<string | null>(null)

const handlePhotoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    formData.value.photo = file
    const reader = new FileReader()

    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removePhoto = () => {
  formData.value.photo = null
  photoPreview.value = null
}

const LoadData = async () => {
  const { data: loadData, error: loadError } = await supabase.from('Orders').select('*')

  loadError ? toast.error('Loading Error') : toast.success('Load Successfully')

  const School = loadData?.map((item) => item.title) ?? []

  loadSchool.value = [...new Set(School)]
}

const uploadPhoto = (event: Event) => {
  const uploadPhotoTarget = event.target as HTMLInputElement
  const target = uploadPhotoTarget.files?.[0]

  if (target) {
    formData.value.photo = target
    const Reader = new FileReader()

    Reader.onload = (e) => {
      photoPreview.value = e.target?.result as string
    }
    Reader.readAsDataURL(target)
  }
}

const fetchSection = async (selectedSchool: string) => {
  // Clear sections if no valid school is selected
  if (!selectedSchool || selectedSchool === 'Select School') {
    loadSection.value = []
    SelectedSection.value = 'Select Grade | Section'
    return
  }

  const { data: loadData, error: loadError } = await supabase
    .from('Orders')
    .select('*')
    .eq('title', selectedSchool)

  if (loadError) {
    console.error('Error fetching sections:', loadError)
    toast.error('Error fetching sections')
    return
  }

  // Extract sections and remove duplicates
  const allSections = loadData.map((item: { section: string }) => item.section)

  loadSection.value = allSections
  SelectedSection.value = 'Select Grade | Section' // Reset section selection
}

watch(
  SelectedSchool,
  (newTitle) => {
    if (newTitle && newTitle !== 'Select School') {
      fetchSection(newTitle)
    } else {
      loadSection.value = []
      SelectedSection.value = 'Select Grade | Section' // Corrected this line
    }
  },
  { immediate: true },
)
onMounted(() => {
  LoadData()
})
</script>

<template>
  <div class="min-h-screen bg-[url('@/assets/background-ls.png')] bg-cover bg-center">
    <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-90"
        ></div>
        <div
          class="relative px-4 py-10 bg-white/95 backdrop-blur-sm shadow-lg sm:rounded-3xl sm:p-20"
        >
          <div class="max-w-md mx-auto">
            <div class="text-center">
              <h1 class="text-2xl font-semibold text-gray-900 mb-6">ID Registration Form</h1>
            </div>

            <form class="space-y-6">
              <!-- Photo Upload Section -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700"> Upload Photo * </label>
                <div class="flex items-center justify-center w-full">
                  <div
                    v-if="!photoPreview"
                    class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        class="w-8 h-8 mb-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500">
                        <span class="font-semibold">Click to upload</span> your photo
                      </p>
                      <p class="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                    </div>
                    <input
                      @change="handlePhotoUpload"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      ref="photoInput"
                    />
                  </div>
                  <div v-else class="relative">
                    <img
                      :src="photoPreview"
                      alt="Photo preview"
                      class="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                      @click="removePhoto"
                      type="button"
                      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div v-if="!photoPreview" class="text-center">
                  <button
                    @click="($refs.photoInput as HTMLInputElement).click()"
                    type="button"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Browse Files
                  </button>
                </div>
              </div>

              <div class="space-y-2">
                <label for="School Name" class="block text-sm font-medium text-gray-700">
                  School Name
                </label>
                <select
                  v-model="SelectedSchool"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option v-for="(school, index) in loadSchool" :key="index" :value="school">
                    {{ school }}
                  </option>
                </select>
              </div>

              <div class="space-y-2">
                <label for="Grade " class="block text-sm font-medium text-gray-700"> Grade </label>
                <select
                  v-model="SelectedSection"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option v-for="(section, index) in loadSection" :key="index" :value="section">
                    {{ section }}
                  </option>
                </select>
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
                />
              </div>

              <!-- E-Signature Upload Section -->

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
                  />
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
                    />
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
                    />
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
                    />
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
