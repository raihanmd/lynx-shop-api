import { con } from "../../config/database";

export async function getAddress(userName: string) {
  return await con
    .query(
      `SELECT u.id AS userId,
              a.province AS userProvince,
              a.city AS userCity,
              a.province_id AS userProvinceId,
              a.city_id AS userCityId
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
