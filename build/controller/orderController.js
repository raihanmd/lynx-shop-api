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
const orderService_1 = __importDefault(require("../services/orderService"));
const customResponse_1 = require("../utils/customResponse");
const GET = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const cartUser = yield orderService_1.default.get(req.params);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "Data successfully retrieved.", payload: cartUser }, res);
    }
    catch (err) {
        next(err);
    }
});
const POST = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSucceed = yield orderService_1.default.insertOne(req.body);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "Order added successfully.", payload: isSucceed }, res);
    }
    catch (err) {
        next(err);
    }
});
const checkout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSucceed = yield orderService_1.default.checkout(req.body);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "Checkout succeed.", payload: isSucceed }, res);
    }
    catch (err) {
        next(err);
    }
});
exports.default = { GET, POST, checkout };
