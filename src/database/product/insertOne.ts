import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { ServiceError } from "../../error/serviceError";
import { IPOSTProductBody } from "../../interfaces/product/IProductBody";

export async function insertOne({ productId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight, productSlug, userId, createdAt, productImage, blurhash }: IPOSTProductBody) {
  return await con
    .getConnection()
    //@ts-ignore
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        //@ts-ignore
        const [idCategory = rows] = await connection.query(`SELECT id FROM categories WHERE name = '${productCategory}'`);
        if (idCategory.length <= 0) {
          throw new ServiceError(404, "Category not found.");
        }
        await connection
          .query(
            `INSERT INTO products 
                (id, id_user, id_categories,
                  name, slug, image, blurhash,
                  description, price, quantity,
                  weight, created_at)
                  VALUES ('${productId}', '${userId}', '${idCategory[0].id}', 
                          '${productName}', '${productSlug}', '${productImage}', 
                          '${blurhash}', '${productDescription}', ${productPrice}, 
                          ${productQuantity}, ${productWeight}, ${createdAt})`
          )
          //@ts-ignore
          .then(async ([fields]) => {
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
    //@ts-ignore
    .catch((err) => {
      throw err;
    });
}
