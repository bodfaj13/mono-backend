import { getCustomerAccountTransactionsInterface } from "../utils/helper-interface";

const axios = require('axios');

const monoURL = 'https://api.withmono.com'

const getCustomerAccountId = async ({ code }: { code: string }) => {
  const res = await axios.post(`${monoURL}/account/auth`, {
    code
  }, {
    headers: {
      'Content-Type': 'application/json',
      'mono-sec-key': process.env.MONO_SECRET_KEY
    }
  })

  const { id } = res.data

  return id
}

const getCustomerAccountDetails = async ({ id }: { id: string }) => {
  const res = await axios.get(`${monoURL}/accounts/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'mono-sec-key': process.env.MONO_SECRET_KEY
    }
  })

  const { data } = res

  return data
}

const getCustomerAccountTransactions = async ({ id, paginatedData }: getCustomerAccountTransactionsInterface) => {

  const { page, limit } = paginatedData

  const res = await axios.get(`${monoURL}/accounts/${id}/transactions`, {
    headers: {
      'Content-Type': 'application/json',
      'mono-sec-key': process.env.MONO_SECRET_KEY
    },
    params: {
      paginate: true,
      ...paginatedData
    }
  })

  const { paging, data } = res.data

  return {
    page,
    limit,
    totalContent: paging.total,
    content: data
  }
}

const unLinkCustomerAccount = async ({ accountId }: {
  accountId: string
}) => {
  await axios.post(`${monoURL}/accounts/${accountId}/unlink`, {}, {
    headers: {
      'Content-Type': 'application/json',
      'mono-sec-key': process.env.MONO_SECRET_KEY
    }
  })
}

const manualDataSync = async ({ accountId }: {
  accountId: string
}) => {
  return await axios.post(`${monoURL}/accounts/${accountId}/sync`, {}, {
    headers: {
      'Content-Type': 'application/json',
      'mono-sec-key': process.env.MONO_SECRET_KEY
    }
  })
}

const accountReauthToken = async ({ accountId }: { accountId: string }) => {
  const res = await axios.post(`${monoURL}/accounts/${accountId}/reauthorise`, {}, {
    headers: {
      'Content-Type': 'application/json',
      'mono-sec-key': process.env.MONO_SECRET_KEY
    }
  })

  const { token } = res.data

  return token
}


const monoService = {
  getCustomerAccountId,
  getCustomerAccountDetails,
  getCustomerAccountTransactions,
  unLinkCustomerAccount,
  manualDataSync,
  accountReauthToken
}

export default monoService