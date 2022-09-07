"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("../config/mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const Schema = mongoose_1.default.Schema;
const accountSchema = new mongoose_1.default.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    accountId: String,
    isLinked: {
        type: Boolean,
        default: true
    },
    dataStatus: String,
    authMethod: String,
    accountName: String,
    currency: String,
    accountType: String,
    accountNumber: String,
    balance: Number,
    bvn: String,
    bankName: String,
    bankCode: String,
    bankType: String,
    dateLinked: Number,
    reauthorisationRequired: {
        type: Boolean,
        default: false
    },
    reauthorisationToken: String,
});
accountSchema.plugin(mongoose_paginate_v2_1.default);
const Accounts = mongoose_1.default.model('Accounts', accountSchema, 'accounts');
exports.default = Accounts;
