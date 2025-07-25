export interface Order {
  id: number
  orderNumber: string
  status: string
  item: number
  customerName: string
  title?: string
  firstName?: string
  middleName?: string
  lastname?: string
  contactNumber?: string
  email?: string

  template?: string
}

export interface FilteredOrder {
  id: number | string
  customerName: string
  status: string
  [key: string]: any
}
