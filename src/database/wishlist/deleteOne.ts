import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { IDELETEWishlistBody } from "../../interfaces/wishlist/IWishlistBody";

export async function deleteOne({ wishlistId, userId }: IDELETEWishlistBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection
          .query(
            `DELETE FROM wishlist 
                WHERE id = '${wishlistId}' AND id_user = '${userId}'`
          )
          .then(([fields]) => {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to insert product.");
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
