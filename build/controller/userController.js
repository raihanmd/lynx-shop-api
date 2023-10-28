var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userService from "../services/userService.js";
import { customResponse } from "../utils/customResponse.js";
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName } = yield userService.register(req.body);
        return customResponse({ statusCode: 200, message: "User created", payload: { userName } }, res);
    }
    catch (err) {
        next(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName } = yield userService.login(req.body);
        return customResponse({ statusCode: 200, message: "Login success", payload: { userName } }, res);
    }
    catch (err) {
        next(err);
    }
});
const getUserPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService.getUserPage(req.params);
        return customResponse({ statusCode: 200, message: "Login success", payload: response }, res);
    }
    catch (err) {
        next(err);
    }
});
const getAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService.getAddress(req.params);
        return customResponse({ statusCode: 200, message: "Data retrivied successfully", payload: response }, res);
    }
    catch (err) {
        next(err);
    }
});
export default { register, login, getUserPage, getAddress };
