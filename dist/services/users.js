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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_1 = __importDefault(require("../models/users"));
const checkEmailAddress = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_1.default.findOne({ email });
});
const createUser = ({ email, password, firstName, lastName }) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    return yield users_1.default.create({ firstName, lastName, email, password: hashedPassword, createdAt: (0, moment_1.default)() });
});
const comparePassword = ({ password, hashedPassword }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, hashedPassword);
});
const getUserById = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_1.default.findOne({ _id: id });
});
const updateUser = ({ _id, update }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_1.default.findOneAndUpdate({ _id }, {
        $set: Object.assign({}, update)
    }, {
        new: true
    });
});
const usersService = {
    checkEmailAddress,
    createUser,
    comparePassword,
    getUserById,
    updateUser
};
exports.default = usersService;
