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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../../services/users"));
const createTokens = (data) => {
    data.password = undefined;
    const token = jsonwebtoken_1.default.sign({ data }, process.env.JWT_SECRET || '');
    const refreshToken = jsonwebtoken_1.default.sign({ data }, process.env.JWT_SECRET || '');
    return {
        token,
        refreshToken
    };
};
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const headerToken = req.header("authorization");
    const token = headerToken && headerToken.split(' ')[1];
    try {
        const decodedData = jsonwebtoken_1.default.verify(token || '', process.env.JWT_SECRET || '');
        const { data } = decodedData;
        const checkUser = yield users_1.default.getUserById({ id: data._id });
        if (checkUser === null) {
            return res.status(401).json({
                success: false,
                message: "Please login to continue"
            });
        }
        if (checkUser.isActive !== true) {
            return res.status(401).json({
                success: false,
                message: "Please login to continue"
            });
        }
        req.user = checkUser;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Please login to continue"
        });
    }
});
const authMiddleware = {
    createTokens,
    checkToken
};
exports.default = authMiddleware;
