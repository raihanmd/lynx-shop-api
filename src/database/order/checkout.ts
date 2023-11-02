import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { ServiceError } from "../../error/serviceError";
import { ICheckoutOrderBody } from "../../interfaces/order/IOrderBody";

export async function checkout({ userId, orderId, checkoutAt }: ICheckoutOrderBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        //@ts-ignore
        const [walletUser = rows] = await connection.query(
          `SELECT balance
              FROM wallet
              WHERE id_user = '${userId}' FOR UPDATE`
        );

        //@ts-ignore
        const [orderUser = rows] = await connection.query(
          `SELECT payment_total AS paymentTotal
            FROM orders
              WHERE id = '${orderId}' FOR UPDATE`
        );

        if (walletUser.length <= 0) {
          throw new ServiceError(404, "User not found.");
        }

        if (walletUser[0].balance < orderUser[0].paymentTotal) {
          throw new DatabaseError("Yout balance is not enough for do this action.");
        }

        await connection
          .query(
            `UPDATE orders
                SET status = 'PAID'
                   WHERE id = '${orderId}'`
          )
          .then(([fields]) => {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to insert data.");
            }
          });

        await connection
          .query(
            `UPDATE orders
                SET checkout_at = ${checkoutAt}
                   WHERE id = '${orderId}'`
          )
          .then(([fields]) => {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to insert data.");
            }
          });

        await connection
          .query(
            `UPDATE wallet
                SET balance = ${walletUser[0].balance - orderUser[0].paymentTotal}
                  WHERE id_user = '${userId}'`
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
