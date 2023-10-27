import slugify from "slugify";
import { con } from "../../config/database.js";
import { DatabaseError } from "../../error/databaseError.js";
import { ServiceError } from "../../error/serviceError.js";
import { IUpdateProductBody } from "../../interfaces/product/IProductBody.js";

export async function update({ userId, productId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight }: IUpdateProductBody) {
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
