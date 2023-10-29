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
Object.defineProperty(exports, "__esModule", { value: true });
const serviceError_1 = require("../error/serviceError");
const encodeImageToBlurhash_1 = require("../utils/encodeImageToBlurhash");
const getBlurhash = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { productImage } = req;
    if (!productImage) {
        throw new serviceError_1.ServiceError(403, "Invalid format body JSON.");
    }
    const blurhash = yield (0, encodeImageToBlurhash_1.encodeImageToBlurhash)(productImage);
    return blurhash;
});
exports.default = { getBlurhash };
