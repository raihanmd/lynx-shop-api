import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { ServiceError } from "../../error/serviceError";
import { IPOSTOrderBody } from "../../interfaces/order/IOrderBody";

export async function insertOne({ userId, productId, productQuantity, orderId, orderDate }: IPOSTOrderBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        //@ts-ignore
        const [detailProduct = rows] = await connection.query(
          `SELECT p.price, 
                  pd.quantity 
            FROM products AS p
              INNER JOIN products_detail AS pd ON p.id = pd.id_products
                WHERE p.id = '${productId}' FOR UPDATE`
        );
        if (detailProduct.length <= 0) {
          throw new DatabaseError("Invalid action.");
        }

        if (detailProduct[0].quantity < productQuantity) {
          throw new ServiceError(400, "Quantity of product is lesser than you try to order.");
        }

        const paymentTotal = detailProduct[0].price * productQuantity;

        await connection
          .query(
            `INSERT INTO orders
                (id, id_user, payment_total, status, order_date)
                  VALUES ('${orderId}', '${userId}', ${paymentTotal}, 'UNPAID',
                    ${orderDate})`
          )
          .then(([fields]) => {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to insert data.");
            }
          });

        await connection
          .query(
            `INSERT INTO orders_detail
                (id_products, id_orders, price, quantity, subtotal)
                  VALUES ('${productId}', '${orderId}', ${detailProduct[0].price},
                    ${productQuantity}, ${paymentTotal})`
          )
          .then(([fields]) => {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to insert data.");
            }
          });

        await connection
          .query(
            `UPDATE products
                SET quantity = ${detailProduct[0].quantity - productQuantity}
                  WHERE id_products = '${productId}'`
          )
          .then(([fields]) => {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to insert data.");
            }
          });

        await connection
          .query(
            `UPDATE products_detail
              SET quantity = quantity - ${productQuantity}
                WHERE id_products = '${productId}'`
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
