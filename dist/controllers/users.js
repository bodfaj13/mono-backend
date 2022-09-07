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
const validator_1 = __importDefault(require("validator"));
const users_1 = __importDefault(require("../services/users"));
const utils_1 = __importDefault(require("../utils"));
const auth_1 = __importDefault(require("../middleware/auth"));
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = req.body;
    try {
        let validationErrors = {};
        const checkEmailAddress = yield users_1.default.checkEmailAddress({ email });
        const checkPassword = validator_1.default.isStrongPassword(password);
        if (checkEmailAddress) {
            validationErrors.email = 'Email already exists';
        }
        if (!checkPassword) {
            validationErrors.password = 'Password must contain minimun of eight characters, at least one uppercase letter, one lonwercase letter, one number and one special character';
        }
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).send({
                success: false,
                message: 'Validation failed',
                error: validationErrors
            });
        }
        yield users_1.default.createUser({ email, password, firstName, lastName });
        return res.status(200).send({
            success: true,
            message: 'User created successfully',
        });
    }
    catch (error) {
        utils_1.default.handleError(res, error);
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const getUser = yield users_1.default.checkEmailAddress({ email });
        if (getUser === null) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password',
                error: {}
            });
        }
        const comparePassword = yield users_1.default.comparePassword({ password, hashedPassword: getUser.password });
        if (!comparePassword) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password',
                error: {}
            });
        }
        if (getUser.isActive !== true) {
            return res.status(400).send({
                success: false,
                message: 'Accoount is deleted, contact support',
                error: {}
            });
        }
        const tokens = auth_1.default.createTokens(getUser);
        return res.status(200).send({
            success: true,
            message: 'User authenticated successfully',
            data: {
                token: tokens.token,
                refreshToken: tokens.refreshToken
            }
        });
    }
    catch (error) {
        console.log(error);
        utils_1.default.handleError(res, error);
    }
});
const deleteUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    try {
        yield users_1.default.updateUser({
            _id, update: {
                "isActive": false
            }
        });
        return res.status(200).send({
            success: true,
            message: 'User account deleted successfully',
        });
    }
    catch (error) {
        utils_1.default.handleError(res, error);
    }
});
const usersController = {
    signupUser,
    loginUser,
    deleteUserAccount
};
exports.default = usersController;
