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
exports.get = void 0;
const database_1 = require("../../config/database");
function get(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.con
            .query(`SELECT   o.id as orderId,
                  p.id as productId, 
                  p.name as productName,
                  od.quantity as productQuantity,
                  od.price as productPrice,
                  od.subtotal as productSubtotal,
                  o.status as orderStatus,
                  o.order_date AS orderDate
            FROM products AS p
              RIGHT JOIN orders_detail AS od ON (od.id_products = p.id)
                RIGHT JOIN orders AS o ON (o.id = od.id_orders)
                  RIGHT JOIN user AS u ON (u.id = o.id_user)
                    WHERE u.user_name = '${userName}'`)
            .then(([rows]) => rows)
            .catch((err) => {
            throw err;
        });
    });
}
exports.get = get;
