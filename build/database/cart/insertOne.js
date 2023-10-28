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
import { DatabaseError } from "../../error/databaseError.js";
import { ServiceError } from "../../error/serviceError.js";
export function insertOne({ idCart, idUser, idProduct, quantityProduct }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield con
            .getConnection()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            connection.beginTransaction();
            try {
                //@ts-ignore
                const [detailProduct = rows] = yield connection.query(`SELECT p.price, 
									pd.quantity 
									FROM products AS p
									INNER JOIN products_detail AS pd ON p.id = pd.id_products
									WHERE p.id = '${idProduct}'`);
                if (detailProduct.length <= 0) {
                    throw new ServiceError(403, "Invalid action.");
                }
                if (detailProduct[0].quantity < quantityProduct) {
                    throw new ServiceError(400, "Quantity of product is lesser than you try to order.");
                }
                yield connection
                    .query(`INSERT INTO cart
										(id, id_user, id_products, quantity)
										VALUES ('${idCart}', '${idUser}', '${idProduct}', ${quantityProduct})`)
                    .then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new DatabaseError("Failed to insert data.");
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