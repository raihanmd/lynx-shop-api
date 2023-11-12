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
const storage_1 = require("firebase/storage");
const firebase_1 = require("../config/firebase");
const deleteImage = (imageName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, storage_1.deleteObject)((0, storage_1.ref)(firebase_1.storage, `images/${imageName}`)).catch((err) => {
        throw err;
    });
});
const getImageURL = (imageName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, storage_1.getDownloadURL)((0, storage_1.ref)(firebase_1.storage, `images/${imageName}`)).catch((err) => {
        throw err;
    });
});
const uploadImage = (blobImage, imageProduct) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageRef = (0, storage_1.ref)(firebase_1.storage, `images/${imageProduct}`);
        yield (0, storage_1.uploadBytes)(imageRef, blobImage, { contentType: "image/webp" }).catch((err) => {
            throw err;
        });
    }
    catch (error) {
        throw error;
    }
});
exports.default = { deleteImage, getImageURL, uploadImage };
