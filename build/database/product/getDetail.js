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
export function getDetail(userName, productSlug) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield con
            .query(`SELECT   p.id as productId, 
                p.name as productName,
                p.price as productPrice,
                p.image AS productImage,
                p.blurhash AS productBlurhash,
                p.description as productDescription,
                p.quantity as productQuantity,
                p.weight as productWeight,
                AVG(r.rating) AS productRating,
                COUNT(r.id) AS totalReviews,
                COUNT(o.id) AS totalOrders,
                user.user_name as ownedBy
          FROM products AS p
            INNER JOIN user ON (user.id = p.id_user)
              LEFT JOIN reviews AS r ON (r.id_products = p.id)
                LEFT JOIN orders_detail AS od ON od.id_products = p.id
                  LEFT JOIN orders AS o ON o.id = od.id_orders
                    WHERE p.slug = '${productSlug}' AND user.user_name = '${userName}'
                      GROUP BY p.id, p.name, p.price, p.description, p.quantity, user.user_name`)
            //@ts-ignore
            .then(([rows]) => rows[0])
            .catch((err) => {
            throw err;
        });
    });
}
