var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import sharp from "sharp";
import { encode } from "blurhash";
export const convertToPNG = (inputBlob) => __awaiter(void 0, void 0, void 0, function* () {
    return sharp(inputBlob).ensureAlpha().toFormat("png").toBuffer();
});
export const encodeImageToBlurhash = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get(path, {
        responseType: "arraybuffer",
    });
    let imageData = response.data;
    imageData = yield convertToPNG(imageData);
    const { data: pixels, info: metadata } = yield sharp(imageData).raw().toBuffer({ resolveWithObject: true });
    const clamped = new Uint8ClampedArray(pixels);
    const encoded = encode(clamped, metadata.width, metadata.height, 4, 4);
    return encoded;
});
