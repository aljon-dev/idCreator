export interface Order {
  id: number
  orderNumber: string
  status: string
  item: number
  customerName: string
  trackingCode?: string
  title?: string
  firstName?: string
  middleName?: string
  lastName?: string
  idNumber?: string
  contactNumber?: string
  email?: string
  shippingService?: string
  template?: string
}

export interface FilteredOrder {
  id: number | string
  customerName: string
  status: string
  [key: string]: any
}
