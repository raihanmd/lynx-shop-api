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
export function deleteOne({ productId, userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield con
            .getConnection()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            connection.beginTransaction();
            try {
                yield connection
                    .query(`DELETE FROM products 
                WHERE id = '${productId}' AND id_user = '${userId}'`)
                    .then(([fields]) => {
                    if (fields.affectedRows <= 0) {
                        const err = new Error(`Internal server error.`);
                        err.statusCode = 500;
                        err.payload = "Failed to delete data.";
                        throw err;
                    }
                });
                yield connection.commit();
            }
            catch (err) {
                yield connection.rollback();
                throw err;
            }
        }))
            .catch((err) => {
            throw err;
        });
    });
}
