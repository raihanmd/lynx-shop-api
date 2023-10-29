import { con } from "../src/config/database";
import productDatabase from "../src/database/product/productDatabase";

export const deleteTestUser = async () => {
  await con.query("DELETE FROM user WHERE user_name = 'test'");
};

export const createTestUser = async () => {
  await con.query(`INSERT INTO user (id, oauth_id, user_name, email, provider) VALUES ('test', 'test', 'test', 'test@test.com', 'test')`);
};

export const createTestProduct = async () => {
  await productDatabase.insertOne({ blurhash: "test", productCategory: "test", productDescription: "test", productImage: "test", productName: "test", productPrice: 1, productQuantity: 1, productWeight: 1, userId: "test" });
};
