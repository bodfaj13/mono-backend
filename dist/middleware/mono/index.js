"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyWebhook = (req, res, next) => {
    if (req.headers['mono-webhook-secret'] !== process.env.MONO_WEBHOOK_SECRET_KEY) {
        return res.status(401).json({
            message: "Unauthorized request."
        });
    }
    next();
};
const monoMiddleware = {
    verifyWebhook
};
exports.default = monoMiddleware;
