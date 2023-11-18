import { con } from "../../config/database";

// TODO must refaktor this

export async function get(userName: string) {
  return await con
    .query(
      `SELECT   w.id AS wishlistId,
                p.id AS productId,
                p.name AS productName,
                p.slug AS productSlug
          FROM wishlist AS w
            RIGHT JOIN products AS p ON (p.id = w.id_products)
                RIGHT JOIN user AS u ON (u.id = w.id_user)
                    WHERE u.user_name = '${userName}'`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
