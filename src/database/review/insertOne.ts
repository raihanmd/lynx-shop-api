import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { IPOSTReviewBody } from "../../interfaces/review/IReviewBody";

export async function insertOne({ reviewsId, userId, productId, reviewsRating, reviewsComment, createdAt }: IPOSTReviewBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection
          .query(
            `INSERT INTO reviews
                (id, id_user, id_products, rating, comment, created_at)
                  VALUES ('${reviewsId}', '${userId}', '${productId}', ${reviewsRating},
                  '${reviewsComment}', ${createdAt})`
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
