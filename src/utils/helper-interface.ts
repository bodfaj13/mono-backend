export interface Usermodel {
  email: string,
  password: string,
  isActive: boolean,
  _id?: string
}

export interface DocumentUpdateObject {
  [key: string]: string | number | boolean | undefined
}

export interface DocumentUpdate {
  _id: string,
  update: DocumentUpdateObject
}

export interface paginatedData {
  limit: number,
  offset: number,
}


export interface paginatedDataApp {
  page: number,
  limit: number,
}

export interface getLinkedAccountsInterface {
  userId: string,
  paginatedData: paginatedData
}

export interface saveAccountInterface {
  userId: string,
  accountId: string,
  accountDetails: any
}

export interface getCustomerAccountTransactionsInterface {
  id: string,
  paginatedData: paginatedDataApp
}

export interface comparePasswordInterface  {
  password: string, 
  hashedPassword: string
}

export interface createUserInterface {
  email: string, 
  password: string,
  firstName: string,
  lastName: string
}