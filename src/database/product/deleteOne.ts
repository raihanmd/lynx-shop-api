import { con } from "../../config/database.js";
import { DatabaseError } from "../../error/databaseError.js";
import { IDeleteProductBody } from "../../interfaces/product/IPostProductBody.js";

export async function deleteOne({ productId, userId }: IDeleteProductBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection
          .query(
            `DELETE FROM products 
                WHERE id = '${productId}' AND id_user = '${userId}'`
          )
          .then(([fields]) => {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to delete product.");
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
