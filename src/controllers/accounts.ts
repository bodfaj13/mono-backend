import { Response, Request } from 'express';
import accountsService from "../services/accounts"
import monoService from "../services/mono"
import Utils from "../utils"
import cron from 'node-cron'
import { accountInterface } from '../models/accounts';

cron.schedule('0 */3 * * *', async () => {
  const allAccounts: any = await accountsService.getAllAccounts()

  for (let index = 0; index < allAccounts.length; index++) {
    const accountId = allAccounts[index].accountId

    await monoService.manualDataSync({ accountId })
  }
})


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


  try {
    const accountDetails = await accountsService.getAccountDetails(accountId)

    const transactions = await monoService.getCustomerAccountTransactions({ id: accountId, paginatedData: { page: paginatedData.page, limit: paginatedData.limit } })

    return res.status(200).send({
      success: true,
      message: 'List of account transactions',
      data: {
        ...transactions,
        accountDetails
      }
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
    Utils.handleError(res, error)
  }
}

const monoWebHook = async (req: Request, res: Response) => {
  const { event, data } = req.body;

  const accountId = data.account._id

  switch (event) {
    case 'mono.events.reauthorisation_required':

      const reauthorisationToken = await monoService.accountReauthToken({ accountId })

      await accountsService.updateAccountByAccountId({
        accountId,
        update: {
          "reauthorisationToken": reauthorisationToken,
          "reauthorisationRequired": true,
        }
      })
      break;

    case 'mono.events.account_reauthorized':
      console.log('bank to base')
      await accountsService.updateAccountByAccountId({
        accountId,
        update: {
          "reauthorisationToken": '',
          "reauthorisationRequired": false,
        }
      })
      break;

    case 'mono.events.account_updated':
      await accountsService.updateAccountByAccountId({
        accountId,
        update: {
          "dataStatus": data.meta.data_status,
          "balance": data.account.balance,
        }
      })
      break;
  }

  return res.sendStatus(200);
}


const accountsController = {
  linkAccount,
  getLinkedAccounts,
  getAccountTransactions,
  unLinkAccount,
  monoWebHook
}

export default accountsController