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
const moment_1 = __importDefault(require("moment"));
const accounts_1 = __importDefault(require("../models/accounts"));
const saveAccount = ({ userId, accountId, accountDetails }) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, account } = accountDetails;
    return yield accounts_1.default.create({
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
        dateLinked: (0, moment_1.default)()
    });
});
const getLinkedAccounts = ({ userId, paginatedData }) => __awaiter(void 0, void 0, void 0, function* () {
    const userAccounts = yield accounts_1.default.paginate({
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
const updateAccount = ({ _id, update }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield accounts_1.default.findOneAndUpdate({ _id }, {
        $set: Object.assign({}, update)
    }, {
        new: true
    });
});
const updateAccountByAccountId = ({ accountId, update }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield accounts_1.default.findOneAndUpdate({ accountId }, {
        $set: Object.assign({}, update)
    }, {
        new: true
    });
});
const getAccountDetails = (accountId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield accounts_1.default.findOne({ accountId });
});
const getAllAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield accounts_1.default.find({ isLinked: true });
});
const accountsService = {
    saveAccount,
    getLinkedAccounts,
    updateAccount,
    getAccountDetails,
    getAllAccounts,
    updateAccountByAccountId
};
exports.default = accountsService;
