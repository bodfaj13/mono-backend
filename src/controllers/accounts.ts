import { Response, Request } from 'express';
import accountsService from "../services/accounts"
import monoService from "../services/mono"
import Utils from "../utils"

const linkAccount = async (req: Request, res: Response) => {
  const { code } = req.body
  const { _id } = req.user

  try {
    const getCustomerAccountId = await monoService.getCustomerAccountId({ code })

    const getCustomerAccountDetails = await monoService.getCustomerAccountDetails({ id: getCustomerAccountId })

    await accountsService.saveAccount({
      userId: _id,
      accountId: getCustomerAccountId,
      accountDetails: getCustomerAccountDetails
    })

    return res.status(200).send({
      success: true,
      message: 'Account linked successfully',
    })

  } catch (error) {
    Utils.handleError(res, error)
  }
}

const getLinkedAccounts = async (req: Request, res: Response) => {
  const { page, size } = req.query;
  const { _id } = req.user

  const paginatedData = Utils.getPagination(Number(page), Number(size))

  try {
    const linkedAccounts = await accountsService.getLinkedAccounts({ userId: _id, paginatedData })

    return res.status(200).send({
      success: true,
      message: 'List of linked accounts',
      data: linkedAccounts
    })

  } catch (error) {
    Utils.handleError(res, error)
  }
}

const getAccountTransactions = async (req: Request, res: Response) => {
  const { page, size } = req.query;
  const { accountId } = req.params

  const paginatedData = Utils.getPagination(Number(page), Number(size))

  const { limit, offset } = paginatedData

  try {
    const transactions = await monoService.getCustomerAccountTransactions({ id: accountId, paginatedData: { page: offset, limit } })

    return res.status(200).send({
      success: true,
      message: 'List of account transactions',
      data: transactions
    })

  } catch (error) {
    Utils.handleError(res, error)
  }
}

const unLinkAccount = async (req: Request, res: Response) => {
  const { _id, accountId } = req.params

  try {
    await monoService.unLinkCustomerAccount({ accountId })

    await accountsService.updateAccount({
      _id, update: {
        "isLinked": false
      }
    })

    return res.status(200).send({
      success: true,
      message: 'Account unlinked successfully',
    })

  } catch (error) {
    console.log(error)
    Utils.handleError(res, error)
  }
}


const accountsController = {
  linkAccount,
  getLinkedAccounts,
  getAccountTransactions,
  unLinkAccount
}

export default accountsController