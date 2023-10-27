import { con } from "../../config/database.js";

export async function getPage(userName: string) {
  return await con
    .query(
      `SELECT ud.image AS userImage,
              ud.banner AS userBanner,
              ud.bio AS userBio,
              ud.shop_description AS userShopDescription,
              AVG(r.rating) AS totalRating
        FROM user AS u
          RIGHT JOIN user_detail AS ud ON u.id = ud.id_user
						LEFT JOIN reviews AS r ON u.id = r.id_user
							WHERE u.user_name = '${userName}'
								GROUP BY u.id;`
    )
    // @ts-ignore
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
