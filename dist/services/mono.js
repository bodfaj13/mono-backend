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
const axios = require('axios');
const monoURL = 'https://api.withmono.com';
const getCustomerAccountId = ({ code }) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios.post(`${monoURL}/account/auth`, {
        code
    }, {
        headers: {
            'Content-Type': 'application/json',
            'mono-sec-key': process.env.MONO_SECRET_KEY
        }
    });
    const { id } = res.data;
    return id;
});
const getCustomerAccountDetails = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios.get(`${monoURL}/accounts/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'mono-sec-key': process.env.MONO_SECRET_KEY
        }
    });
    const { data } = res;
    return data;
});
const getCustomerAccountTransactions = ({ id, paginatedData }) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = paginatedData;
    const res = yield axios.get(`${monoURL}/accounts/${id}/transactions`, {
        headers: {
            'Content-Type': 'application/json',
            'mono-sec-key': process.env.MONO_SECRET_KEY
        },
        params: Object.assign({ paginate: true }, paginatedData)
    });
    const { paging, data } = res.data;
    return {
        page,
        limit,
        totalContent: paging.total,
        content: data
    };
});
const unLinkCustomerAccount = ({ accountId }) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios.post(`${monoURL}/accounts/${accountId}/unlink`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'mono-sec-key': process.env.MONO_SECRET_KEY
        }
    });
});
const monoService = {
    getCustomerAccountId,
    getCustomerAccountDetails,
    getCustomerAccountTransactions,
    unLinkCustomerAccount
};
exports.default = monoService;
