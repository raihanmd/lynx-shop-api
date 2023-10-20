var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import supabase from "../../config/supabase.js";
import { ResponseError } from "../../error/responseError.js";
import { validate } from "../../utils/validation.js";
import { registerUserValidation } from "../../validation/userValidation.js";
export const register = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = validate(registerUserValidation, req);
    const { data } = yield supabase.from("user").select("id");
    if (Number(data) === 0) {
        throw new ResponseError(400, "Username already exists");
    }
});
