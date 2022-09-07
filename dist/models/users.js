"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("../config/mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: [true, 'Email already taken'],
        required: [true, 'Email is required'],
        validate: [validator_1.default.isEmail, 'Invalid email address provided']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userLevel: {
        type: Number,
        default: 0
    },
    createdAt: Number
});
userSchema.plugin(mongoose_paginate_v2_1.default);
const Users = mongoose_1.default.model('Users', userSchema, 'users');
exports.default = Users;
