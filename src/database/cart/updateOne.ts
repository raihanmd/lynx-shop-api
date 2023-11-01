import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { ServiceError } from "../../error/serviceError";
import { IPUTCartBody } from "../../interfaces/cart/ICartBody";

export async function updateOne({ cartId, userId, productId, productQuantity }: IPUTCartBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        //@ts-ignore
        const [detailProduct = rows] = await connection.query(
          `SELECT   p.price, 
                    p.quantity 
                FROM products AS p
                  WHERE p.id = '${productId}'`
        );
        if (detailProduct.length <= 0) {
          throw new ServiceError(403, "Invalid action.");
        }

        if (detailProduct[0].quantity < productQuantity) {
          throw new ServiceError(400, "Quantity of product is lesser than you try to order.");
        }

        await connection
          .query(
            `UPDATE cart 
                  SET quantity = '${productQuantity}'
                      WHERE id = '${cartId}' AND id_user = '${userId}'`
          )
          .then(([fields]) => {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to update data, only accept updating your own cart.");
            }
          });

        await connection.commit();
      } catch (err) {
        await connection.rollback();
        throw err;
      }
    })
    .catch((err) => {
      throw err;
    });
}
