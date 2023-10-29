import { con } from "../src/config/database";

export const deleteTestUser = async () => {
  await con.query("DELETE FROM user WHERE user_name = 'test'");
};

export const createTestUser = async () => {
  await con.query(`INSERT INTO user (id, oauth_id, user_name, email, provider) VALUES ('test', 'test', 'test', 'test@test.com', 'test')`);
};
