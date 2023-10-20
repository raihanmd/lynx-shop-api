var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PREFIX } from "../const/prefix.js";
import { validate } from "../utils/validation.js";
import { getNanoid } from "../utils/getNanoid.js";
import { loginUserValidation, registerUserValidation } from "../validation/userValidation.js";
import userDatabase from "../database/user/userDatabase.js";
const register = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = validate(registerUserValidation, req);
    // if (isExist?.length === 1) throw new ServiceError(400, "Username already exists");
    user.userId = PREFIX.USER + getNanoid();
    yield userDatabase.registerUser(user);
    // if (newUserError) throw new Error();
    // return newUser[0];
});
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const loginRequest = validate(loginUserValidation, req);
    // if (!user || user.length === 0) throw new ServiceError(401, "Username or password wrong");
    // if (!isPasswordValid) throw new ServiceError(401, "Username or password wrong");
    // return user[0];
});
export default { register, login };
