"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accounts_1 = __importDefault(require("../controllers/accounts"));
const mono_1 = __importDefault(require("../middleware/mono"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});
router.post('/webhook/mono', mono_1.default.verifyWebhook, (req, res) => accounts_1.default.monoWebHook(req, res));
exports.default = router;
