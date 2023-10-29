import { con } from "../../config/database";
import { DatabaseError } from "../../error/databaseError";
import { IRegisterUserBody } from "../../interfaces/user/IUserBody";

export async function register({ userId, userName, userEmail, userOAuthId, userProvider, userImage }: IRegisterUserBody): Promise<{ userName: string } | any> {
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
              throw new DatabaseError("Failed to insert user.");
            }
          }
        });
        await connection.query(`INSERT INTO user_detail (id_user, image) VALUES ('${userId}', '${userImage}')`).then(([fields]) => {
          //@ts-ignore
          if (fields.affectedRows <= 0) {
            //@ts-ignore
            if (fields.affectedRows <= 0) {
              throw new DatabaseError("Failed to insert user.");
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
