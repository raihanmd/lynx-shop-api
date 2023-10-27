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
export function getDetail(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield con
            .query(`SELECT ud.image AS userImage,
              ud.banner AS userBanner,
              ud.bio AS userBio,
              ud.shop_description AS userShopDescription, 
              p.id AS productId,
              p.slug AS productSlug,
              p.name AS productName,
              p.price AS productPrice,
              COUNT(o.id) AS totalOrders,
              p.image AS productImage,
              p.blurhash AS productBlurhash,
              u.user_name AS ownedBy,
              p.created_at AS createdAt
              AVG(r.rating) AS totalRating
        FROM products AS p
          RIGHT JOIN user_detail AS ud ON u.id = ud.id_user
            LEFT JOIN reviews AS r ON r.id_products = p.id
              LEFT JOIN orders_detail AS od ON od.id_products = p.id
                LEFT JOIN orders AS o ON o.id = od.id_orders
                  LEFT JOIN reviews AS r ON u.id = r.id_user
                    INNER JOIN user AS u ON u.id = p.id_user
                      WHERE u.user_name = '${userName}'
                        GROUP BY u.id, p.id
                          ORDER BY p.created_at DESC;`)
            .then(([rows]) => rows)
            .catch((err) => {
            throw err;
        });
    });
}
