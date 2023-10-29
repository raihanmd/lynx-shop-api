"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customResponse = void 0;
const customResponse = ({ statusCode, message, payload }, res) => {
    return res
        .set("Access-Control-Allow-Origin", "*")
        .set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        .set("Cache-Control", "public, max-age=300, stale-while-revalidate=59")
        .set("Content-Type", "application/json")
        .status(statusCode)
        .json({
        statusCode,
        payload,
        message,
    });
};
exports.customResponse = customResponse;
