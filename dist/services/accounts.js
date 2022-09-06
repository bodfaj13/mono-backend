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
Object.defineProperty(exports, "__esModule", { value: true });
const Accounts = require("../models/accounts");
const saveAccount = ({ userId, accountId, accountDetails }) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, account } = accountDetails;
    return yield Accounts.create({
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
        bankType: account.institution.type
    });
});
const getLinkedAccounts = ({ userId, paginatedData }) => __awaiter(void 0, void 0, void 0, function* () {
    const userAccounts = yield Accounts.paginate({
        userId,
        isLinked: true
    }, paginatedData);
    const { totalDocs, limit, page, docs } = userAccounts;
    return {
        page,
        limit,
        totalContent: totalDocs,
        content: docs,
    };
});
const updateAccount = ({ _id, update }) => {
    return Accounts.findOneAndUpdate({ _id }, {
        $set: Object.assign({}, update)
    }, {
        new: true
    });
};
const accountsService = {
    saveAccount,
    getLinkedAccounts,
    updateAccount
};
exports.default = accountsService;
