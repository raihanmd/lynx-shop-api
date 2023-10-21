var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PREFIX from "../../const/prefix.js";
import userDatabase from "../../database/user/userDatabase.js";
import { getNanoid } from "../../utils/getNanoid.js";
import { validate } from "../../utils/validation.js";
import { registerUserValidation } from "../../validation/userValidation.js";
export const register = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = validate(registerUserValidation, req);
    user.userId = PREFIX.USER + getNanoid();
    const { userName } = yield userDatabase.register(user);
    return userName;
});
