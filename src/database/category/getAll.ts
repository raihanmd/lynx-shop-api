import { con } from "../../config/database";

export async function getAll() {
  return await con
    .query(
      `SELECT name
        FROM categories`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
