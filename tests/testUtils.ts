import { con } from "../src/config/database";
import productDatabase from "../src/database/product/productDatabase";

export const deleteTestUser = async () => {
  await con.query("DELETE FROM user WHERE user_name = 'test'");
  await con.query("DELETE FROM user_detail WHERE image = 'test'");
  await con.query("DELETE FROM addresses WHERE province = 'test'");
  await con.query("DELETE FROM wallet WHERE id_user = 'test'");
};

export const deleteTestUserVerify = async () => {
  await con.query("DELETE FROM user WHERE user_name = 'testVerify'");
  await con.query("DELETE FROM user_detail WHERE image = 'testVerify'");
  await con.query("DELETE FROM addresses WHERE province = 'testVerify'");
  await con.query("DELETE FROM wallet WHERE id_user = 'testVerify'");
};

export const createTestUserVerify = async () => {
  await con.query(`INSERT INTO user (id, oauth_id, user_name, email, provider) VALUES ('testVerify', 'testVerify', 'testVerify', 'testVerify@testVerify.com', 'testVerify')`);
  await con.query(`INSERT INTO user_detail (id_user, image) VALUES ('testVerify', 'testVerify')`);
};

export const createTestProduct = async () => {
  await productDatabase.insertOne({ blurhash: "test", productCategory: "test", productDescription: "test", productImage: "test", productName: "test", productPrice: 1, productQuantity: 1, productWeight: 1, userId: "test" });
};
