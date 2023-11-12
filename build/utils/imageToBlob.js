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
exports.imageToBlob = void 0;
const sharp_1 = __importDefault(require("sharp"));
function imageToBlob(arrayBuffer, maxSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const image = (0, sharp_1.default)(arrayBuffer);
        const metadata = yield image.metadata();
        //@ts-ignore
        const imageRatio = metadata.width / metadata.height;
        let targetWidth, targetHeight;
        if (imageRatio >= 1) {
            //@ts-ignore
            targetWidth = Math.min(metadata.width, maxSize);
            targetHeight = Math.round(targetWidth / imageRatio);
        }
        else {
            //@ts-ignore
            targetHeight = Math.min(metadata.height, maxSize);
            targetWidth = Math.round(targetHeight * imageRatio);
        }
        const resizedImageBuffer = yield image.resize(targetWidth, targetHeight, { fit: "inside" }).toBuffer();
        const webpBuffer = yield (0, sharp_1.default)(resizedImageBuffer).toFormat("webp").toBuffer();
        const webpBlob = new Blob([webpBuffer], { type: "image/webp" });
        return webpBlob;
    });
}
exports.imageToBlob = imageToBlob;
