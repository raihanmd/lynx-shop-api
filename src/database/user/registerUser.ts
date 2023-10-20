import { con } from "../../config/database.js";
import { ServiceError } from "../../error/serviceError.js";
import { IRegisterLoginUserBody } from "../../interfaces/user/IRegisterLoginUserBody.js";

export async function registerUser({ userId, userName, userEmail, userOAuthId, userProvider, userImage }: IRegisterLoginUserBody) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection.query(`INSERT INTO user (id, oauth_id, user_name, email, provider) VALUES ('${userId}', '${userOAuthId}', '${userName}', '${userEmail}', '${userProvider}')`).then(([fields]) => {
          //@ts-ignore
          if (fields.affectedRows <= 0) {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new ServiceError(500, "Failed to insert data.");
            }
          }
        });
        await connection.query(`INSERT INTO user_detail (id_user, image) VALUES ('${userId}', '${userImage}')`).then(([fields]) => {
          //@ts-ignore
          if (fields.affectedRows <= 0) {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new ServiceError(500, "Failed to insert data.");
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
