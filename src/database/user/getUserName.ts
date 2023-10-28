import { con } from "../../config/database.js";

export async function getUserName(userName: string) {
  return await con
    .query(
      `SELECT u.user_name AS userName
        FROM user AS u
            WHERE user_name = '${userName}'`
    )
    //@ts-ignore
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
