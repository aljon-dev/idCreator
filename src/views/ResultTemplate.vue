<script  setup lang="ts">
import { onMounted, ref } from 'vue';
import { supabase } from '../assets/supabase';
import {useToast } from 'vue-toast-notification';


 const toast = useToast();


 const title = ref<string[]>([]);
 const selectedTitle = ref<string | null>(null);

 const loadTitle  = async () => {

    const {data:loadData,error:loadError} = await supabase.from('Orders').select('*');
     
    if(loadError){
        return {
            status:500,
            msg:loadError.message
        }
    }

     loadData.forEach((item: { title: string }) => {
         title.value.push(item.title);
     });

    return {
        status:200,
        data:loadData
    }

 }

 onMounted(async ()=>{
    const response = await loadTitle();
    if(response.status === 200){
        toast.success('Data loaded successfully');

    }else{
        toast.error(response.msg);
    }

    
 })









</script>

<template> 


<div class="w-full h-full items-center">
    <div class="flex flex-row justify-between mt-5">
      <h2 class="font-bold text-2xl">Export to PDF </h2>
      <button class="bg-[#DB551B] py-2 px-2 rounded text-white font-semibold">Export to PDF</button>
    </div> 
    <div class="flex flex-row  gap-5 mt-5 ">
       <div class="flex flex-col w-1//2">
        <label class="text-gray-700 font-semibold mb-2">Select School</label>
         <select class="py-2 px-2 border border-gray-300  rounded" v-model="selectedTitle">
            <option v-for="(item, index) in title" :key="index" :value="item">
      {{ item }}
    </option>
        </select>
       </div>

          <div class="flex flex-col w-1//2">
        <label class="text-gray-700 font-semibold mb-2">Select Grade</label>
         <select class="py-2 px-2 border border-gray-300  rounded">
            <option value="template1">Template 1</option>
            <option value="template2">Template 2</option>
            <option value="template3">Template 3</option>
        </select>
       </div>
        

        


    </div>

</div>
</template>