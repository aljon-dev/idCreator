
import { supabase } from './supabase'


const handleLogin =  async (email:string, password:string)=> {

    const {error:errorLogin} = await supabase.auth.signInWithPassword({
        email,
        password,
    })


    if(errorLogin){
        return{
            status:500,
            msg:errorLogin.message,
        }
    }

    return{
        status:200,
        msg:'Successfully Login'
    }
}  

export {handleLogin};


