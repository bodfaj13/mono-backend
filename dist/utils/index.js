"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError = (res, error) => {
    switch (error.name) {
        case 'ValidationError':
            const errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).send({
                success: false,
                message: 'Validation failed',
                error: errors
            });
        case 'AxiosError':
            const errorMessage = error.response.data.message || 'Something went wrong';
            return res.status(400).send({
                success: false,
                message: errorMessage,
                error: {}
            });
        default:
            return res.status(400).send({
                success: false,
                message: 'Something went wrong',
                error: {}
            });
    }
};
const getPagination = (page, size) => {
    const limit = size ? size : 10;
    const offset = page ? page : 1;
    return { limit, page: offset };
};
const Utils = {
    handleError,
    getPagination
};
exports.default = Utils;
