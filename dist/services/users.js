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
const bcrypt = require('bcryptjs');
const Users = require("../models/users");
const checkEmailAddress = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Users.findOne({ email });
});
const createUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt.hash(password, 10);
    return yield Users.create({ email, password: hashedPassword });
});
const comparePassword = ({ password, hashedPassword }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt.compare(password, hashedPassword);
});
const getUserById = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Users.findOne({ _id: id });
});
const updateUser = ({ _id, update }) => {
    return Users.findOneAndUpdate({ _id }, {
        $set: Object.assign({}, update)
    }, {
        new: true
    });
};
const usersService = {
    checkEmailAddress,
    createUser,
    comparePassword,
    getUserById,
    updateUser
};
exports.default = usersService;
