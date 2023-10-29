import { con } from "../../config/database";
import { ILoginUserBody } from "../../interfaces/user/ILoginUserBody";

export async function login({ userOAuthId, userEmail, userProvider }: ILoginUserBody): Promise<{ username: string } | any> {
  return await con
    .query(`SELECT user_name AS userName FROM user WHERE oauth_id = '${userOAuthId}' AND email = '${userEmail}' AND provider = '${userProvider}'`)
    .then(([rows]: Array<any>) => rows[0])
    .catch((err) => {
      throw err;
    });
}
