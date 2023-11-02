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
exports.insertOne = void 0;
const database_1 = require("../../config/database");
const databaseError_1 = require("../../error/databaseError");
const serviceError_1 = require("../../error/serviceError");
function insertOne({ userId, productId, productQuantity, orderId, orderDate }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.con
            .getConnection()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            connection.beginTransaction();
            try {
                //@ts-ignore
                const [detailProduct = rows] = yield connection.query(`SELECT p.price, 
                  pd.quantity 
            FROM products AS p
              INNER JOIN products_detail AS pd ON p.id = pd.id_products
                WHERE p.id = '${productId}' FOR UPDATE`);
                if (detailProduct.length <= 0) {
                    throw new databaseError_1.DatabaseError("Invalid action.");
                }
                if (detailProduct[0].quantity < productQuantity) {
                    throw new serviceError_1.ServiceError(400, "Quantity of product is lesser than you try to order.");
                }
                const paymentTotal = detailProduct[0].price * productQuantity;
                yield connection
                    .query(`INSERT INTO orders
                (id, id_user, payment_total, status, order_date)
                  VALUES ('${orderId}', '${userId}', ${paymentTotal}, 'UNPAID',
                    ${orderDate})`)
                    .then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new databaseError_1.DatabaseError("Failed to insert data.");
                    }
                });
                yield connection
                    .query(`INSERT INTO orders_detail
                (id_products, id_orders, price, quantity, subtotal)
                  VALUES ('${productId}', '${orderId}', ${detailProduct[0].price},
                    ${productQuantity}, ${paymentTotal})`)
                    .then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new databaseError_1.DatabaseError("Failed to insert data.");
                    }
                });
                yield connection
                    .query(`UPDATE products
                SET quantity = ${detailProduct[0].quantity - productQuantity}
                  WHERE id_products = '${productId}'`)
                    .then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new databaseError_1.DatabaseError("Failed to insert data.");
                    }
                });
                yield connection
                    .query(`UPDATE products_detail
              SET quantity = quantity - ${productQuantity}
                WHERE id_products = '${productId}'`)
                    .then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new databaseError_1.DatabaseError("Failed to insert data.");
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
exports.insertOne = insertOne;
