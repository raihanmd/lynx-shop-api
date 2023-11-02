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
exports.checkout = void 0;
const database_1 = require("../../config/database");
const databaseError_1 = require("../../error/databaseError");
const serviceError_1 = require("../../error/serviceError");
function checkout({ userId, orderId, checkoutAt }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.con
            .getConnection()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            connection.beginTransaction();
            try {
                //@ts-ignore
                const [walletUser = rows] = yield connection.query(`SELECT balance
              FROM wallet
              WHERE id_user = '${userId}' FOR UPDATE`);
                //@ts-ignore
                const [orderUser = rows] = yield connection.query(`SELECT payment_total AS paymentTotal
            FROM orders
              WHERE id = '${orderId}' FOR UPDATE`);
                if (walletUser.length <= 0) {
                    throw new serviceError_1.ServiceError(404, "User not found.");
                }
                if (walletUser[0].balance < orderUser[0].paymentTotal) {
                    throw new databaseError_1.DatabaseError("Yout balance is not enough for do this action.");
                }
                yield connection
                    .query(`UPDATE orders
                SET status = 'PAID'
                   WHERE id = '${orderId}'`)
                    .then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new databaseError_1.DatabaseError("Failed to insert data.");
                    }
                });
                yield connection
                    .query(`UPDATE orders
                SET checkout_at = ${checkoutAt}
                   WHERE id = '${orderId}'`)
                    .then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new databaseError_1.DatabaseError("Failed to insert data.");
                    }
                });
                yield connection
                    .query(`UPDATE wallet
                SET balance = ${walletUser[0].balance - orderUser[0].paymentTotal}
                  WHERE id_user = '${userId}'`)
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
exports.checkout = checkout;
