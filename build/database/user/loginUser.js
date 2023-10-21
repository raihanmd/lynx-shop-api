var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { con } from "../../config/database.js";
export function login({ userOAuthId, userEmail, userProvider }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield con
            .query(`SELECT * FROM user WHERE oauth_id = '${userOAuthId}' AND email = '${userEmail}' AND provider = '${userProvider}'`)
            .then(([rows]) => rows[0])
            .catch((err) => {
            throw err;
        });
    });
}
