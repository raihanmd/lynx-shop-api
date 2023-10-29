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
const customResponse_1 = require("../utils/customResponse");
const userService_1 = __importDefault(require("../services/userService"));
const verify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService_1.default.verify(req.body);
        console.log(req.body);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "User validation successfully, you now have Rp.1.000.000 free balance.", payload: response }, res);
    }
    catch (err) {
        next(err);
    }
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService_1.default.register(req.body);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "User created.", payload: response }, res);
    }
    catch (err) {
        next(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService_1.default.login(req.body);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "Login success.", payload: response }, res);
    }
    catch (err) {
        next(err);
    }
});
const GETUserPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService_1.default.getUserPage(req.params);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "Data retrivied successfully.", payload: response }, res);
    }
    catch (err) {
        next(err);
    }
});
const GETAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService_1.default.getAddress(req.params);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "Data retrivied successfully.", payload: response }, res);
    }
    catch (err) {
        next(err);
    }
});
exports.default = { verify, register, login, GETUserPage, GETAddress };
