import { con } from "../../config/database";

export async function getByUserId(userId: string): Promise<Array<object> | any> {
  return await con
    .query(`SELECT balance FROM wallet WHERE id_user = '${userId}'`)
    .then(([rows]: Array<any>) => rows[0])
    .catch((err) => {
      throw err;
    });
}
