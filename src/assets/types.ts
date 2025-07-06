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