var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { customResponse } from "../utils/customResponse.js";
import blurhashService from "../services/blurhashService.js";
const getBlurhash = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blurahsh = yield blurhashService.getBlurhash(req.body);
        return customResponse({ statusCode: 200, message: "User created", payload: blurahsh }, res);
    }
    catch (err) {
        next(err);
    }
});
export default { getBlurhash };
