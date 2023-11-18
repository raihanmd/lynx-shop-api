import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { IPUTReviewBody } from "../../interfaces/review/IReviewBody";

export async function updateOne({ reviewsId, userId, productId, reviewsRating, reviewsComment, updatedAt }: IPUTReviewBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection
          .query(
            `UPDATE reviews 
                SET rating = ${reviewsRating}, 
                    comment = '${reviewsComment}', 
                    updated_at = ${updatedAt}
                WHERE id = '${reviewsId}' AND id_user = '${userId}' AND id_products = '${productId}'`
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
