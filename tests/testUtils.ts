import { con } from "../src/config/database";
import productDatabase from "../src/database/product/productDatabase";
import walletDatabase from "../src/database/wallet/walletDatabase";

export const deleteTestUser = async () => {
  await con.query("DELETE FROM user WHERE user_name = 'test'");
  await con.query("DELETE FROM user_detail WHERE id_user = 'test'");
};

export const createTestUser = async () => {
  await con.query(`INSERT INTO user (id, oauth_id, user_name, email, provider) VALUES ('test', 'test', 'test', 'test@test.com', 'test')`);
};

export const createTestWalletUser = async () => {};
