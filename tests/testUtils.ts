import { con } from "../src/config/database";
import productDatabase from "../src/database/product/productDatabase";
import userDatabase from "../src/database/user/userDatabase";

export const createTestUser = async () => {
  await con.query(`INSERT INTO user (id, oauth_id, user_name, email, provider) VALUES ('test', 'test', 'test', 'test@test.com', 'test')`);
  await con.query(`INSERT INTO user_detail (id_user, image) VALUES ('test', 'test')`);
};

export const deleteTestUser = async () => {
  await con.query("DELETE FROM user WHERE user_name = 'test'");
  await con.query("DELETE FROM user_detail WHERE image = 'test'");
  await con.query("DELETE FROM addresses WHERE province = 'test'");
  await con.query("DELETE FROM wallet WHERE id_user = 'test'");
  await con.query("DELETE FROM products WHERE id_user = 'test'");
};

export const createTestUserVerification = async () => {
  await con.query(`INSERT INTO user (id, oauth_id, user_name, email, provider) VALUES ('testVerif', 'testVerif', 'testVerif', 'testVerif@testVerif.com', 'testVerif')`);
  await con.query(`INSERT INTO user_detail (id_user, image) VALUES ('testVerif', 'testVerif')`);
};

export const deleteTestUserVerification = async () => {
  await con.query("DELETE FROM user WHERE id = 'testVerif'");
  await con.query("DELETE FROM user_detail WHERE id_user = 'testVerif'");
  await con.query("DELETE FROM addresses WHERE province = 'testVerif'");
  await con.query("DELETE FROM wallet WHERE id_user = 'testVerif'");
  await con.query("DELETE FROM products WHERE id_user = 'testVerif'");
};

export const createTestCategory = async () => {
  await con.query("INSERT INTO categories (id, name) VALUES ('test', 'test')");
};

export const deleteTestCategory = async () => {
  await con.query("DELETE FROM categories WHERE id = 'test'");
};

export const verifyTestUser = async () => {
  await userDatabase.verify({ userBio: "test", userCity: "test", userCityId: 1, userId: "test", userProvince: "test", userProvinceId: 1, userShopDesc: "test" });
};

export const createTestProduct = async () => {
  await productDatabase.insertOne({ blurhash: "test", productCategory: "test", productDescription: "test", productImage: "test", productName: "test", productPrice: 1, productQuantity: 1, productWeight: 1, userId: "test" });
};
