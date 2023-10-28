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
export function getAll(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield con
            .query(`SELECT   c.id AS cartId,
                p.id AS productId,
                p.name AS productName,
                p.price AS productPrice,
                c.quantity AS productQuantity
            FROM cart AS c
                RIGHT JOIN user AS u ON (u.id = c.id_user)
                    RIGHT JOIN products AS p ON (p.id = c.id_products)
                        WHERE u.user_name = '${userName}'`)
            //@ts-ignore
            .then(([rows]) => rows)
            .catch((err) => {
            throw err;
        });
    });
}
