import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { IDELETECartBody } from "../../interfaces/cart/ICartBody";

export async function deleteOne({ cartId, userId }: IDELETECartBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection
          .query(
            `DELETE FROM cart 
                  WHERE id = '${cartId}' AND id_user = '${userId}'`
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
