import { con } from "../../config/database.js";

export async function getAddress(userName: string) {
  return await con
    .query(
      `SELECT a.province AS userProvince,
              a.city AS userCity
        FROM user AS u
          LEFT JOIN addresses AS a ON u.id = a.id_user
            WHERE user_name = '${userName}'`
    )
    //@ts-ignore
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
