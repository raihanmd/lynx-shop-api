"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const errorResponse = ({ statusCode, error }, res) => {
    return res.status(statusCode).json({
        statusCode,
        error,
    });
};
exports.errorResponse = errorResponse;
