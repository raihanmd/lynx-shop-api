import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { ServiceError } from "../../error/serviceError";
import { IPOSTCartBody } from "../../interfaces/cart/ICartBody";

export async function insertOne({ cartId, userId, productId, productQuantity }: IPOSTCartBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        //@ts-ignore
        const [detailProduct = rows] = await connection.query(
          `SELECT p.price, 
									p.quantity 
								FROM products AS p
									WHERE p.id = '${productId}'`
        );
        if (detailProduct.length <= 0) {
          throw new ServiceError(404, "Product not found.");
        }

        if (detailProduct[0].quantity < productQuantity) {
          throw new ServiceError(400, "Quantity of product is lesser than you try to order.");
        }

        await connection
          .query(
            `INSERT INTO cart
										(id, id_user, id_products, quantity)
										VALUES ('${cartId}', '${userId}', '${productId}', ${productQuantity})`
          )
          .then(([fields]) => {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to insert data.");
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
