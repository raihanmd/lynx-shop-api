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
const firebase_1 = __importDefault(require("../firebase/firebase"));
const getUuid_1 = require("../utils/getUuid");
const imageToBlob_1 = require("../utils/imageToBlob");
const uploadImage = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageUrl } = req;
    const res = yield fetch(imageUrl);
    const arrayBuffer = yield res.arrayBuffer();
    const imageProduct = `${(0, getUuid_1.getUuid)()}.webp`;
    const resultBlob = yield (0, imageToBlob_1.imageToBlob)(arrayBuffer, 250);
    yield firebase_1.default.uploadImage(resultBlob, imageProduct).catch((err) => {
        throw err;
    });
    const productImageURL = yield firebase_1.default.getImageURL(imageProduct).catch((err) => {
        throw err;
    });
    return productImageURL;
});
exports.default = { uploadImage };
