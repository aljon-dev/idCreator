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


export interface StudentItem {
  'NAME OF STUDENT':string,
  ADDRESS:string,
  BIRTHDAY:string | number,
  'YR /SEC/ course':string,
  LRN:string,
  'GUARDIAN/ PARENT':string,
  'CONTACT NO':string,
   photo?: string
}

export   type UploadResponse = {
  status: number
  msg: string
}
