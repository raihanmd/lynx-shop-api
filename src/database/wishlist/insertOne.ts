import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { IPOSTWishlistBody } from "../../interfaces/wishlist/IWishlistBody";

export async function insertOne({ wishlistId, userId, productId }: IPOSTWishlistBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection
          .query(
            `INSERT INTO wishlist
                (id, id_user, id_products)
                  VALUES ('${wishlistId}', '${userId}', '${productId}')`
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
