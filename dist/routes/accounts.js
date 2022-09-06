"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accounts_1 = __importDefault(require("../controllers/accounts"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/linkaccount', auth_1.default.checkToken, (req, res) => accounts_1.default.linkAccount(req, res));
router.get('/linkedaccounts', auth_1.default.checkToken, (req, res) => accounts_1.default.getLinkedAccounts(req, res));
router.get('/transactions/:accountId', auth_1.default.checkToken, (req, res) => accounts_1.default.getAccountTransactions(req, res));
router.patch('/unlink/:_id/:accountId', auth_1.default.checkToken, (req, res) => accounts_1.default.unLinkAccount(req, res));
exports.default = router;
