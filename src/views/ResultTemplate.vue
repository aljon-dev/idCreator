<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { supabase } from '../assets/supabase';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const title = ref<string[]>([]);
const sections = ref<string[]>([]);
const selectedTitle = ref<string | null>('Select School');
const selectedSection = ref<string | null>('Select Grade | Section');

const FetchData = async () => {
    const { data: loadData, error: loadError } = await supabase.from('Orders').select('*');
    
    if (loadError) {
        return {
            status: 500,
            msg: loadError.message
        }
    }

    const allTitles = loadData.map((item: { title: string }) => item.title);
    const uniqueTitles = [...new Set(allTitles)];
    
    title.value = uniqueTitles;

    return {
        status: 200,
        data: loadData
    }
}

const fetchSection = async (selectedSchool: string) => {
    // Clear sections if no valid school is selected
    if (!selectedSchool || selectedSchool === 'Select School') {
        sections.value = [];
        selectedSection.value = 'Select Grade | Section';
        return;
    }

    const { data: loadData, error: loadError } = await supabase
        .from('Orders')
        .select('*')
        .eq('title', selectedSchool);

    if (loadError) {
        console.error('Error fetching sections:', loadError);
        toast.error('Error fetching sections');
        return;
    }

    // Extract sections and remove duplicates
    const allSections = loadData.map((item: { section: string }) => item.section);
 
    
    sections.value =  allSections;
    selectedSection.value = 'Select Grade | Section'; // Reset section selection
}

// Watch for changes in selectedTitle
watch(selectedTitle, (newTitle) => {
    if (newTitle && newTitle !== 'Select School') {
        fetchSection(newTitle);
    } else {
        sections.value = [];
        selectedSection.value = 'Select Grade | Section';
    }
});

onMounted(async () => {
    const response = await FetchData();
    if (response.status === 200) {
        toast.success('Data loaded successfully');
    } else {
        toast.error(response.msg);
    }
})
</script>

<template>
<div class="w-full h-full items-center">
    <div class="flex flex-row justify-between mt-5">
        <h2 class="font-bold text-2xl">Export to PDF</h2>
        <button class="bg-[#DB551B] py-2 px-2 rounded text-white font-semibold">Export to PDF</button>
    </div> 
    <div class="flex flex-row gap-5 mt-5">
        <div class="flex flex-col w-1/2">
            <label class="text-gray-700 font-semibold mb-2">Select School</label>
            <select class="py-2 px-2 border border-gray-300 rounded" v-model="selectedTitle">
                <option disabled value="Select School">Select School</option>
                <option v-for="(item, index) in title" :key="index" :value="item">
                    {{ item }}
                </option>
            </select>
        </div>

        <div class="flex flex-col w-1/2">
            <label class="text-gray-700 font-semibold mb-2">Select Grade | Section</label>
            <select class="py-2 px-2 border border-gray-300 rounded" v-model="selectedSection">
                <option disabled value="Select Grade | Section">Select Grade | Section</option>
                <option v-for="(section, index) in sections" :key="index" :value="section">
                    {{ section }}
                </option>
            </select>
        </div>
    </div>
</div>
</template>