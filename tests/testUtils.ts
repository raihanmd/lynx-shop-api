import { con } from "../src/config/database";
import productDatabase from "../src/database/product/productDatabase";
import userDatabase from "../src/database/user/userDatabase";

export const deleteTestUser = async () => {
  await con.query("DELETE FROM user WHERE user_name = 'test'");
  await con.query("DELETE FROM user_detail WHERE image = 'test'");
  await con.query("DELETE FROM addresses WHERE province = 'test'");
  await con.query("DELETE FROM wallet WHERE id_user = 'test'");
};

export const deleteTestUserVerify = async () => {
  await con.query("DELETE FROM user WHERE user_name = 'testDummy'");
  await con.query("DELETE FROM user_detail WHERE image = 'testDummy'");
  await con.query("DELETE FROM addresses WHERE province = 'testDummy'");
  await con.query("DELETE FROM wallet WHERE id_user = 'testDummy'");
};

export const createTestUserDummy = async () => {
  await con.query(`INSERT INTO user (id, oauth_id, user_name, email, provider) VALUES ('testDummy', 'testDummy', 'testDummy', 'testDummy@testDummy.com', 'testDummy')`);
  await con.query(`INSERT INTO user_detail (id_user, image) VALUES ('testDummy', 'testDummy')`);
};

export const verifyTestUserDummy = async () => {
  await userDatabase.verify({ userBio: "testDummy", userCity: "testDummy", userCityId: 1, userId: "testDummy", userProvince: "testDummy", userProvinceId: 1, userShopDesc: "testDummy" });
};

export const createTestProduct = async () => {
  await productDatabase.insertOne({ blurhash: "test", productCategory: "test", productDescription: "test", productImage: "test", productName: "test", productPrice: 1, productQuantity: 1, productWeight: 1, userId: "test" });
};
