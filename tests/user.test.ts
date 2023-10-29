import supertest from "supertest";

import { app } from "../src/app/index";
import { con } from "../src/config/database";

describe("POST /v1/user", () => {
  afterEach(async () => {
    await con.query("DELETE FROM user WHERE id = 'usr_001'");
  });

  it("Should can register new user", async () => {
    const result = await supertest(app).post("/v1/user").send({
      userId: "usr_001",
      userOAuthId: "001",
      userEmail: "root@root.com",
      userName: "root",
      userProvider: "root",
      userImage: "root",
    });

    console.log(result);

    // expect(result.statusCode).toBe(200);
    // expect(result.message).toBe("User created.");
    // message: "User created.", payload: { userName }
  });
});
