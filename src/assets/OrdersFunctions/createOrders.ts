import {supabase } from '../supabase';



const setOrders =  async ( newOrders: {},imageFile:File ) => {

        const FileExtended = imageFile.name.split('.').pop();
        
        const filePath = `E_signature/${FileExtended}`;


        const {error:uploadError} = await supabase.storage.from('templates').upload(filePath,imageFile,{
            cacheControl:'3600',
            upsert:true,
        })

        if(uploadError){
            return{
                status:500,
                msg:uploadError.message
            }
        }

        const {data:publicImageUrl,} = await supabase.storage.from('templates').getPublicUrl(filePath);

    

        const newOrderData = {
            ...newOrders,
            e_signature: publicImageUrl.publicUrl,
            
        }
        const { error } = await supabase.from('Orders').insert([newOrderData])
            
        if(error){
            return{
                status:500,
                msg:error.message,
            }
        }
        
        return{
            status:200,
            msg:'Successfully Inserted the Data'
        }

}

export {setOrders}