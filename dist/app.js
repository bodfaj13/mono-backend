"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const swagger_1 = __importDefault(require("./swagger"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const accounts_1 = __importDefault(require("./routes/accounts"));
const mongoose_1 = __importDefault(require("./config/mongoose"));
const db = mongoose_1.default.connection;
// When successfully connected
db.on("connected", () => {
    console.log("Mongo DB connection open for DB");
});
const app = (0, express_1.default)();
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.set('view engine', 'html');
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/', index_1.default);
app.use('/api/users', users_1.default);
app.use('/api/accounts', accounts_1.default);
app.listen(process.env.PORT || 2000, () => {
    console.log(`running on port ${process.env.PORT || '2000 '}🚀`);
});
