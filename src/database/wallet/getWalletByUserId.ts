import { con } from "../../config/database.js";

export async function getWalletByUserId(userId: string): Promise<Array<object> | any> {
  return await con
    .query(`SELECT balance FROM wallet WHERE id_user = '${userId}'`)
    .then(([rows]: Array<any>) => rows[0])
    .catch((err) => {
      throw err;
    });
}
