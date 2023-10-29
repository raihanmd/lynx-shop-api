import supertest, { Response } from "supertest";

import { app } from "../src/app/index";
import { con } from "../src/config/database";

import { IRegisterUserBody } from "../src/interfaces/user/IRegisterUserBody";
import { ILoginUserBody } from "../src/interfaces/user/ILoginUserBody";

describe("POST /v1/register", () => {
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
});

describe("POST /v1/login", () => {
  afterEach(async () => {
    await con.query("DELETE FROM user WHERE user_name = 'root'");
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
