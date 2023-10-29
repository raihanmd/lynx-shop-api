//@ts-ignore
import slugify from "slugify";

import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { ServiceError } from "../../error/serviceError";
import { IPUTProductBody } from "../../interfaces/product/IProductBody";

export async function updateOne({ userId, productId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight }: IPUTProductBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        //@ts-ignore
        const [idCategory = rows] = await connection.query(`SELECT id FROM categories WHERE name = '${productCategory}'`);
        if (idCategory.length <= 0) {
          throw new ServiceError(404, "Product not found.");
        }
        //@ts-ignore
        const productSlug = slugify(productName);
        await connection
          .query(
            `UPDATE products 
                SET id_categories = '${idCategory[0].id}', 
                    name = '${productName}', 
                    slug = '${productSlug}',
                    description = '${productDescription}', 
                    price = ${productPrice},
                    quantity = ${productQuantity},
                    weight = ${productWeight},
                    WHERE id = '${productId}' AND id_user = '${userId}'`
          )
          .then(([fields]) => {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to update product.");
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
