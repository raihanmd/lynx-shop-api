var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import { PREFIX } from "../const/prefix.js";
import { supabase } from "../config/supabase.js";
import { validate } from "../utils/validation.js";
import { getNanoid } from "../utils/getNanoid.js";
import { ServiceError } from "../error/serviceError.js";
import { loginUserValidation, registerUserValidation } from "../validation/userValidation.js";
const register = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = validate(registerUserValidation, req);
    const { data: isExist } = yield supabase.from("user").select("username").eq("username", user.userName);
    if ((isExist === null || isExist === void 0 ? void 0 : isExist.length) === 1)
        throw new ServiceError(400, "Username already exists");
    user.userId = PREFIX.USER + getNanoid();
    user.userPassword = yield bcrypt.hash(user.userPassword, 10);
    const { data: newUser, error: newUserError } = yield supabase
        .from("user")
        .insert([{ id: user.userId, username: user.userName, password: user.userPassword }])
        .select("username");
    if (newUserError)
        throw new Error();
    return newUser[0];
});
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const loginRequest = validate(loginUserValidation, req);
    const { data: user } = yield supabase.from("user").select("username,password").eq("username", loginRequest.userName);
    if (!user || user.length === 0)
        throw new ServiceError(401, "Username or password wrong");
    const isPasswordValid = yield bcrypt.compare(loginRequest.userPassword, (_a = user[0]) === null || _a === void 0 ? void 0 : _a.password);
    if (!isPasswordValid)
        throw new ServiceError(401, "Username or password wrong");
    return user[0];
});
export default { register, login };
