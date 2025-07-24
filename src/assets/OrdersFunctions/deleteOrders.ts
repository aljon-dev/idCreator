import { supabase } from '../supabase'

const deleteOrders = async (orderId: string | number) => {
  const { error } = await supabase.from('Orders').delete().eq('id', orderId)

  if (error) {
    return {
      status: 500,
      msg: error.message,
    }
  }

  return {
    status: 200,
    msg: 'Successfully Deleted the Order',
  }
}

export { deleteOrders }
