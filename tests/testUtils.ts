import { con } from "../src/config/database";
import userDatabase from "../src/database/user/userDatabase";

export const createTestUser = async (test: string = "test") => {
  await con.query(`INSERT INTO user (id, oauth_id, user_name, email, provider) VALUES ('${test}', '${test}', '${test}', '${test}@${test}.com', '${test}')`);
  await con.query(`INSERT INTO user_detail (id_user, image) VALUES ('${test}', '${test}')`);
};

export const deleteTestUser = async (test: string = "test") => {
  await con.query(`DELETE FROM user WHERE user_name = '${test}'`);
  await con.query(`DELETE FROM user_detail WHERE image = '${test}'`);
  await con.query(`DELETE FROM addresses WHERE province = '${test}'`);
  await con.query(`DELETE FROM wallet WHERE id_user = '${test}'`);
  await con.query(`DELETE FROM products WHERE id_user = '${test}'`);
};

export const createTestUserVerification = async () => createTestUser("testVerif");

export const deleteTestUserVerification = async () => deleteTestUser("testVerif");

export const createTestCategory = async () => {
  await con.query("INSERT INTO categories (id, name) VALUES ('test', 'test')");
};

export const deleteTestCategory = async () => {
  await con.query("DELETE FROM categories WHERE id = 'test'");
};

export const createTestProduct = async () => {
  await con.query(`INSERT INTO products (id, id_user, id_categories, name, slug, image, blurhash, description, price, quantity, weight, created_at) VALUES ('test', 'test', 'test',  'test', 'test', 'test',  'test', 'test', 1, 1, 1, 1)`);
};
export const verifyTestUser = async () => {
  await userDatabase.verify({ userBio: "test", userCity: "test", userCityId: 1, userId: "test", userProvince: "test", userProvinceId: 1, userShopDesc: "test" });
};
