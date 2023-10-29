import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { IVerifyUserBody } from "../../interfaces/user/IUserBody";

export async function verify({ userId, userProvince, userProvinceId, userCity, userCityId, userBio, userShopDesc }: IVerifyUserBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection.query(`INSERT INTO wallet (id_user, balance) VALUES ('${userId}', 1000000)`).then(([fields]) => {
          //@ts-ignore
          if (fields.affectedRows <= 0) {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to insert data.");
            }
          }
        });
        await connection.query(`INSERT INTO addresses (id_user, province, city, province_id, city_id) VALUES ('${userId}', '${userProvince}', '${userCity}', '${userProvinceId}', '${userCityId}')`).then(([fields]) => {
          //@ts-ignore
          if (fields.affectedRows <= 0) {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to insert data.");
            }
          }
        });
        await connection
          .query(
            `UPDATE user_detail AS ud 
                SET bio = '${userBio}', 
                    shop_description = '${userShopDesc}'
                WHERE id_user = '${userId}';`
          )
          .then(([fields]) => {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              //@ts-ignore
              if (fields.affectedRows <= 0) {
                throw new DatabaseError("Failed to insert data. 3");
              }
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
