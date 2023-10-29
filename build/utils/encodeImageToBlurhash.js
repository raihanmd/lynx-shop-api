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
exports.encodeImageToBlurhash = exports.convertToPNG = void 0;
//@ts-ignore
const axios_1 = __importDefault(require("axios"));
//@ts-ignore
const sharp_1 = __importDefault(require("sharp"));
//@ts-ignore
const blurhash_1 = require("blurhash");
const convertToPNG = (inputBlob) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, sharp_1.default)(inputBlob).ensureAlpha().toFormat("png").toBuffer();
});
exports.convertToPNG = convertToPNG;
const encodeImageToBlurhash = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(path, {
        responseType: "arraybuffer",
    });
    let imageData = response.data;
    imageData = yield (0, exports.convertToPNG)(imageData);
    const { data: pixels, info: metadata } = yield (0, sharp_1.default)(imageData).raw().toBuffer({ resolveWithObject: true });
    const clamped = new Uint8ClampedArray(pixels);
    const encoded = (0, blurhash_1.encode)(clamped, metadata.width, metadata.height, 4, 4);
    return encoded;
});
exports.encodeImageToBlurhash = encodeImageToBlurhash;
