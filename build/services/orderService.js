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
const prefix_1 = __importDefault(require("../const/prefix"));
const orderDatabase_1 = __importDefault(require("../database/order/orderDatabase"));
const serviceError_1 = require("../error/serviceError");
const getUnixTime_1 = __importDefault(require("../utils/getUnixTime"));
const getUuid_1 = require("../utils/getUuid");
const validation_1 = require("../utils/validation");
const orderValidation_1 = require("../validation/orderValidation");
const get = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req;
    const orders = yield orderDatabase_1.default.get(userName);
    //@ts-ignore
    if (orders.length === 0) {
        throw new serviceError_1.ServiceError(404, "User not found.");
    }
    //@ts-ignore
    if (!orders[0].productId) {
        throw new serviceError_1.ServiceError(404, "Order not found.");
    }
    //@ts-ignore
    return orders;
});
const insertOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const orderBody = (0, validation_1.validate)(orderValidation_1.POSTOrderValidation, req);
    orderBody.orderId = prefix_1.default.ORDER + (0, getUuid_1.getUuid)();
    orderBody.orderDate = (0, getUnixTime_1.default)();
    yield orderDatabase_1.default.insertOne(orderBody);
    return { isSucceed: true };
});
const checkout = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const orderBody = (0, validation_1.validate)(orderValidation_1.CheckoutOrderValidation, req);
    orderBody.checkoutAt = (0, getUnixTime_1.default)();
    yield orderDatabase_1.default.checkout(orderBody);
    return { isSucceed: true };
});
exports.default = { get, insertOne, checkout };
