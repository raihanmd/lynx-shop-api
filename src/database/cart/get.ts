import { con } from "../../config/database";

export async function get(userName: string) {
  return await con
    .query(
      `SELECT   c.id AS cartId,
                p.id AS productId,
                p.name AS productName,
                p.price AS productPrice,
                c.quantity AS productQuantity
            FROM cart AS c
                RIGHT JOIN user AS u ON (u.id = c.id_user)
                    RIGHT JOIN products AS p ON (p.id = c.id_products)
                        WHERE u.user_name = '${userName}'`
    )
    //@ts-ignore
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
