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
const rajaongkirService_1 = __importDefault(require("../services/rajaongkirService"));
const customResponse_1 = require("../utils/customResponse");
const GETProvinces = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provinces = yield rajaongkirService_1.default.getProvinces(req.params);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "Data successfully retrieved.", payload: provinces }, res);
    }
    catch (err) {
        next(err);
    }
});
const GETCities = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cityId = yield rajaongkirService_1.default.getCities(req.params);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "Data successfully retrieved.", payload: cityId }, res);
    }
    catch (err) {
        next(err);
    }
});
const POSTGetCost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const costs = yield rajaongkirService_1.default.getCost(req.body);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "Product added successfully.", payload: costs }, res);
    }
    catch (err) {
        next(err);
    }
});
exports.default = { POSTGetCost, GETCities, GETProvinces };
