import {supabase } from '../supabase';



const setOrders =  async (
    
    newOrders: {},
    selectedTemplate:string | number | null,
    
    ) => {

        const newOrderData = {
            ...newOrders,
            template:selectedTemplate,
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