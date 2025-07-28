
import {supabase} from '../supabase'
import type { UploadResponse } from '../types';

const uploadProfilePhoto = (file:File,  orderId: number | string,  index:number):Promise<UploadResponse> => {


    const extendedFilename = file.name.split('.').pop();
     const filePath =  `student_photos/${extendedFilename}`;



      return new Promise(async (resolve, reject) => {

        const {data,error} = await supabase.storage.from('templates').upload(filePath,file,{
            cacheControl:'3600',
            upsert:true
        })

        const {data:publicUrl} = supabase.storage.from('templates').getPublicUrl(filePath);

        const {data:orderData,error:orderError} = await supabase.from('Orders').select('item').eq('id',orderId).single();
     
        if(orderError){
            reject({
                status:500,
                msg:orderError.message
            })
            return;
        }
           
        const updatedItems =  [...orderData.item] 
         updatedItems[index] = {
                ...updatedItems[index],
                photo: publicUrl.publicUrl
            }
        const { error: updateError } = await supabase.from('Orders').update({ item: updatedItems }).eq('id', orderId);
        
        if(updateError){
            reject({
                status:500,
                msg:updateError.message
            })
            return;
        }



        if(error){
            reject({
                status:500,
                msg:error.message
            })
        }
        else{
            resolve({
                status:200,
                msg:'Successfully Uploaded the File',
          })
        }


      })
     


}

export { uploadProfilePhoto }