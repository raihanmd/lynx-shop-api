"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = void 0;
const database_1 = require("../../config/database");
const databaseError_1 = require("../../error/databaseError");
const serviceError_1 = require("../../error/serviceError");
function updateOne({ idCart, idUser, idProduct, quantityProduct }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.con
            .getConnection()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            connection.beginTransaction();
            try {
                //@ts-ignore
                const [detailProduct = rows] = yield connection.query(`SELECT   p.price, 
                      pd.quantity 
                FROM products AS p
                  INNER JOIN products_detail AS pd ON p.id = pd.id_products
                    WHERE p.id = '${idProduct}'`);
                if (detailProduct.length <= 0) {
                    throw new serviceError_1.ServiceError(403, "Invalid action.");
                }
                if (detailProduct[0].quantity < quantityProduct) {
                    throw new serviceError_1.ServiceError(400, "Quantity of product is lesser than you try to order.");
                }
                yield connection
                    .query(`UPDATE cart 
                  SET quantity = '${quantityProduct}'
                      WHERE id = '${idCart}' AND id_user = '${idUser}'`)
                    .then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new databaseError_1.DatabaseError("Failed to update data, only accept updating your own cart.");
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
exports.updateOne = updateOne;
