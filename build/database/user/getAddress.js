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
export function getAddress(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield con
            .query(`SELECT a.province AS userProvince,
              a.city AS userCity
        FROM user AS u
          LEFT JOIN addresses AS a ON u.id = a.id_user
            WHERE user_name = '${userName}'`)
            //@ts-ignore
            .then(([rows]) => rows[0])
            .catch((err) => {
            throw err;
        });
    });
}
