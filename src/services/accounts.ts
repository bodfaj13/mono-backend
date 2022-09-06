import { DocumentUpdate, getLinkedAccountsInterface, saveAccountInterface } from "../utils/helper-interface";
import moment from "moment"
import Accounts from "../models/accounts";

const saveAccount = async ({ userId, accountId, accountDetails }: saveAccountInterface) => {
  const { meta, account } = accountDetails;

  return await Accounts.create({
    userId,
    accountId,
    dataStatus: meta.data_status,
    authMethod: meta.auth_method,
    accountName: account.name,
    currency: account.currency,
    accountType: account.type,
    accountNumber: account.accountNumber,
    balance: account.balance,
    bvn: account.bvn,
    bankName: account.institution.name,
    bankCode: account.institution.bankCode,
    bankType: account.institution.type,
    dateLinked: moment()
  });
}

const getLinkedAccounts = async ({ userId, paginatedData }: getLinkedAccountsInterface) => {
  console.log(paginatedData)

  const userAccounts = await Accounts.paginate({
    userId,
    isLinked: true
  }, paginatedData)


  const { totalDocs, limit, page, docs } = userAccounts

  return {
    page,
    limit,
    totalContent: totalDocs,
    content: docs,
  }
}

const updateAccount = ({ _id, update }: DocumentUpdate) => {

  return Accounts.findOneAndUpdate({ _id }, {
    $set: {
      ...update
    }
  }, {
    new: true
  })
}

const accountsService = {
  saveAccount,
  getLinkedAccounts,
  updateAccount
}

export default accountsService