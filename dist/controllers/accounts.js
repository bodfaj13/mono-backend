"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_1 = __importDefault(require("../services/accounts"));
const mono_1 = __importDefault(require("../services/mono"));
const utils_1 = __importDefault(require("../utils"));
const node_cron_1 = __importDefault(require("node-cron"));
node_cron_1.default.schedule('0 */3 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    const allAccounts = yield accounts_1.default.getAllAccounts();
    for (let index = 0; index < allAccounts.length; index++) {
        const accountId = allAccounts[index].accountId;
        yield mono_1.default.manualDataSync({ accountId });
    }
}));
const linkAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const { _id } = req.user;
    try {
        const getCustomerAccountId = yield mono_1.default.getCustomerAccountId({ code });
        const getCustomerAccountDetails = yield mono_1.default.getCustomerAccountDetails({ id: getCustomerAccountId });
        yield accounts_1.default.saveAccount({
            userId: _id,
            accountId: getCustomerAccountId,
            accountDetails: getCustomerAccountDetails
        });
        return res.status(200).send({
            success: true,
            message: 'Account linked successfully',
        });
    }
    catch (error) {
        utils_1.default.handleError(res, error);
    }
});
const getLinkedAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    const { _id } = req.user;
    const paginatedData = utils_1.default.getPagination(Number(page), Number(size));
    try {
        const linkedAccounts = yield accounts_1.default.getLinkedAccounts({ userId: _id, paginatedData });
        return res.status(200).send({
            success: true,
            message: 'List of linked accounts',
            data: linkedAccounts
        });
    }
    catch (error) {
        utils_1.default.handleError(res, error);
    }
});
const getAccountTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    const { accountId } = req.params;
    const paginatedData = utils_1.default.getPagination(Number(page), Number(size));
    try {
        const accountDetails = yield accounts_1.default.getAccountDetails(accountId);
        const transactions = yield mono_1.default.getCustomerAccountTransactions({ id: accountId, paginatedData: { page: paginatedData.page, limit: paginatedData.limit } });
        return res.status(200).send({
            success: true,
            message: 'List of account transactions',
            data: Object.assign(Object.assign({}, transactions), { accountDetails })
        });
    }
    catch (error) {
        utils_1.default.handleError(res, error);
    }
});
const unLinkAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, accountId } = req.params;
    try {
        yield mono_1.default.unLinkCustomerAccount({ accountId });
        yield accounts_1.default.updateAccount({
            _id, update: {
                "isLinked": false
            }
        });
        return res.status(200).send({
            success: true,
            message: 'Account unlinked successfully',
        });
    }
    catch (error) {
        utils_1.default.handleError(res, error);
    }
});
const monoWebHook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event, data } = req.body;
    const accountId = data.account._id;
    switch (event) {
        case 'mono.events.reauthorisation_required':
            const reauthorisationToken = yield mono_1.default.accountReauthToken({ accountId });
            yield accounts_1.default.updateAccountByAccountId({
                accountId,
                update: {
                    "reauthorisationToken": reauthorisationToken,
                    "reauthorisationRequired": true,
                }
            });
            break;
        case 'mono.events.account_reauthorized':
            console.log('bank to base');
            yield accounts_1.default.updateAccountByAccountId({
                accountId,
                update: {
                    "reauthorisationToken": '',
                    "reauthorisationRequired": false,
                }
            });
            break;
        case 'mono.events.account_updated':
            yield accounts_1.default.updateAccountByAccountId({
                accountId,
                update: {
                    "dataStatus": data.meta.data_status,
                    "balance": data.account.balance,
                }
            });
            break;
    }
    return res.sendStatus(200);
});
const accountsController = {
    linkAccount,
    getLinkedAccounts,
    getAccountTransactions,
    unLinkAccount,
    monoWebHook
};
exports.default = accountsController;
