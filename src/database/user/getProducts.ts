import { con } from "../../config/database";

export async function getProducts(userName: string) {
  return await con
    .query(
      `SELECT p.id AS productId,
              p.slug AS productSlug,
              p.name AS productName,
              p.price AS productPrice,
              COUNT(o.id) AS totalOrders,
              p.image AS productImage,
              p.blurhash AS productBlurhash,
              u.user_name AS ownedBy,
              p.created_at AS createdAt,
              AVG(r.rating) AS totalRating
        FROM products AS p
          INNER JOIN user AS u ON u.id = p.id_user
            RIGHT JOIN user_detail AS ud ON u.id = ud.id_user
              LEFT JOIN reviews AS r ON r.id_products = p.id
                LEFT JOIN orders_detail AS od ON od.id_products = p.id
                  LEFT JOIN orders AS o ON o.id = od.id_orders
                    WHERE u.user_name = '${userName}'
                      GROUP BY u.id, p.id
                        ORDER BY p.created_at DESC;`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
