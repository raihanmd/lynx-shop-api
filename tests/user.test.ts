import supertest, { Response } from "supertest";

import { app } from "../build/app/index.js";
import { con } from "../build/config/database.js";

import { IRegisterUserBody } from "../src/interfaces/user/IRegisterUserBody.js";
import { ILoginUserBody } from "../src/interfaces/user/ILoginUserBody.js";

describe("POST /v1/user", () => {
  afterEach(async () => {
    await con.query("DELETE FROM user WHERE user_name = 'root'");
  });

  it("Should can register new user", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }

    const request: IRegisterUserBody = {
      userOAuthId: "001",
      userEmail: "root@root.com",
      userName: "root",
      userProvider: "root",
      userImage: "root",
    };

    const result: Response = await supertest(app).post("/v1/register").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    expect(result.status).toBe(200);
    expect(result.body.statusCode).toBe(200);
    expect(result.body.payload.userName).toBeTruthy();
    expect(result.body.payload.userName).toBe("root");
  });

  it("Should can login user", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }

    const request: ILoginUserBody = {
      userOAuthId: "001",
      userEmail: "root@root.com",
      userProvider: "root",
    };

    const result: Response = await supertest(app).post("/v1/login").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    console.log(result);

    expect(result.status).toBe(200);
    expect(result.body.statusCode).toBe(200);
    expect(result.body.payload.userName).toBeTruthy();
    expect(result.body.payload.userName).toBe("root");
  });
});
