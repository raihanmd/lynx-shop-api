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
exports.getProduct = void 0;
const database_1 = require("../../config/database");
function getProduct(categoryName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.con
            .query(`SELECT p.id AS productId,
              p.slug AS productSlug,
              p.name AS productName,
              p.price AS productPrice,
              AVG(r.rating) AS productRating,
              COUNT(o.id) AS totalOrders,
              p.image AS productImage,
              p.blurhash AS productBlurhash,
              u.user_name AS ownedBy,
              p.created_at AS createdAt
        FROM products AS p
          LEFT JOIN reviews AS r ON r.id_products = p.id
            LEFT JOIN orders_detail AS od ON od.id_products = p.id
              LEFT JOIN orders AS o ON o.id = od.id_orders
                INNER JOIN user AS u ON u.id = p.id_user
                  INNER JOIN categories AS c ON c.id = p.id_categories
                    WHERE c.name = '${categoryName}'
                      GROUP BY u.id, p.id, p.name, p.price, p.description
                        ORDER BY RAND()
                          LIMIT 24;`)
            .then(([rows]) => rows)
            .catch((err) => {
            throw err;
        });
    });
}
exports.getProduct = getProduct;
