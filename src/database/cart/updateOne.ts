import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { ServiceError } from "../../error/serviceError";
import { IPUTCartBody } from "../../interfaces/cart/ICartBody";

export async function updateOne({ idCart, idUser, idProduct, quantityProduct }: IPUTCartBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        //@ts-ignore
        const [detailProduct = rows] = await connection.query(
          `SELECT   p.price, 
                      pd.quantity 
                FROM products AS p
                  INNER JOIN products_detail AS pd ON p.id = pd.id_products
                    WHERE p.id = '${idProduct}'`
        );
        if (detailProduct.length <= 0) {
          throw new ServiceError(403, "Invalid action.");
        }

        if (detailProduct[0].quantity < quantityProduct) {
          throw new ServiceError(400, "Quantity of product is lesser than you try to order.");
        }

        await connection
          .query(
            `UPDATE cart 
                  SET quantity = '${quantityProduct}'
                      WHERE id = '${idCart}' AND id_user = '${idUser}'`
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
