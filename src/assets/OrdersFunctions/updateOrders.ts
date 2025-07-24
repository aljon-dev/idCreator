import { supabase } from '../supabase'

const updateOrders = async (newOrders: {}, orderId: number | string) => {
  newOrders = {
    ...newOrders,
  }

  const { error } = await supabase.from('Orders').update(newOrders).eq('id', orderId)

  if (error) {
    return {
      status: 500,
      msg: error.message,
    }
  }

  return {
    status: 200,
    msg: 'Successfully Updated the Order',
  }
}

export { updateOrders }
