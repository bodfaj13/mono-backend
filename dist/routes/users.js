"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/signup', (req, res) => users_1.default.signupUser(req, res));
router.post('/login', (req, res) => users_1.default.loginUser(req, res));
router.patch('/deleteaccount', auth_1.default.checkToken, (req, res) => users_1.default.deleteUserAccount(req, res));
exports.default = router;
