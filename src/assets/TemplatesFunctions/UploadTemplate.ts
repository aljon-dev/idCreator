import { supabase } from '../supabase'


const  uploadTemplates = async (frontImage:File, backImage:File,FrontFields:any[],BackFields:any[] ) => {

    
    if(frontImage && backImage){
            const extFront = frontImage.name.split('.').pop();
            const fileNameFront = `front.${extFront}`;
            const filePathFront = `frontTemplate/${fileNameFront}`


            const  extBack  =   backImage.name.split('.').pop();
            const fileNameBack = `back.${extBack}`;
            const filePathBack = `backTemplate/${fileNameBack}`;

            const {data:frontImageUrl, error: frontImageError} = await supabase.storage
            .from('templates').upload(filePathFront,frontImage) 
            
            const {data:backImageUrl, error: backImageError} = await supabase.storage 
            .from('templates').upload(filePathBack,backImage);

            
            const {data:frontPublic} =  supabase.storage
            .from('templates').getPublicUrl(filePathFront);

            const {data:backPublic} =  supabase.storage
            .from('templates').getPublicUrl(filePathBack);




            if(frontImageError || backImageError){
                return {
                    status: 500,
                    msg: frontImageError?.message || backImageError?.message,
                }
            }

           const front = Object.fromEntries(FrontFields.map((field =>[field.key,{
             top:`${field.top}px`,
             left:`${field.left}px`,
             width:`${field.width}px`,
            height:`${field.height}px`
           }]
        )
    )
    ) 

        const back = Object.fromEntries(BackFields.map((field=> [field.key,{
            top:`${field.top}px`,
            left:`${field.left}px`,
            width:`${field.width}px`,
            height:`${field.height}px`
        }])))


       const { error: insertError } = await supabase.from('Template').insert({
            front_image: frontPublic.publicUrl,
            back_image: backPublic.publicUrl,
            position: {
            front,
            back,
            },
        })

         if (insertError) {
          return {
             status: 500,
             msg: insertError.message,
          }
        }
    
        return {
          status: 200,
          msg: 'Successfully Uploaded the Template',
        }

            
        

    }else{
        return {
          status: 400,
          msg: 'Please provide both front and back images',
        }
    }


     


}
export {uploadTemplates}