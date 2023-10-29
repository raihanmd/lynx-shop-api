import supertest, { Response } from "supertest";

import { app } from "../src/app/index";

import { createTestUserDummy, deleteTestUser, deleteTestUserVerify } from "./testUtils";
import { ILoginUserBody, IRegisterUserBody, IVerifyUserBody } from "../src/interfaces/user/IUserBody";

afterAll(async () => {
  await deleteTestUser();
});

describe("POST /v1/register", () => {
  it("Should can register new user", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }

    const request: IRegisterUserBody = {
      userOAuthId: "test",
      userEmail: "test@test.com",
      userName: "test",
      userProvider: "test",
      userImage: "test",
    };

    const result: Response = await supertest(app).post("/v1/register").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    expect(result.status).toBe(200);
    expect(result.body.payload.userName).toBeDefined();
    expect(result.body.payload.userName).toBe("test");
  });

  it("Should reject if request is invalid", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }

    const request: IRegisterUserBody = {
      userOAuthId: "",
      userEmail: "",
      userName: "",
      userProvider: "",
      userImage: "",
    };

    const result: Response = await supertest(app).post("/v1/register").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});

describe("POST /v1/login", () => {
  it("Should can login user", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }

    const request: ILoginUserBody = {
      userOAuthId: "test",
      userEmail: "test@test.com",
      userProvider: "test",
    };

    const result: Response = await supertest(app).post("/v1/login").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    expect(result.status).toBe(200);
    expect(result.body.payload.userName).toBeDefined();
    expect(result.body.payload.userName).toBe("test");
  });

  it("Should be unauthorized", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }

    const request: ILoginUserBody = {
      userOAuthId: "wrong",
      userEmail: "test@test.com",
      userProvider: "test",
    };

    const result: Response = await supertest(app).post("/v1/login").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });

  it("Should reject if request is invalid", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }

    const request: ILoginUserBody = {
      userOAuthId: "",
      userEmail: "",
      userProvider: "",
    };

    const result: Response = await supertest(app).post("/v1/login").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});

describe("GET /v1/:userName", () => {
  it("should get user page", async () => {
    const result: Response = await supertest(app).get("/v1/test");

    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
    expect(result.body.payload.userName).toBe("test");
  });

  it("should return 404", async () => {
    const result: Response = await supertest(app).get("/v1/wrong-username");

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });
});

describe("GET /v1/account/:userName", () => {
  it("should get user address", async () => {
    const result: Response = await supertest(app).get("/v1/account/test");

    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
  });

  it("should return 404", async () => {
    const result: Response = await supertest(app).get("/v1/account/wrong-username");

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });
});

describe("POST /v1/verification", () => {
  beforeEach(async () => {
    await createTestUserDummy();
  });

  afterEach(async () => {
    await deleteTestUserVerify();
  });

  it("should success verify user", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }

    const request: IVerifyUserBody = {
      userBio: "testDummy",
      userCity: "testDummy",
      userCityId: 1,
      userId: "testDummy",
      userProvince: "testDummy",
      userProvinceId: 1,
      userShopDesc: "testDummy",
    };

    const result: Response = await supertest(app).post("/v1/verification").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    expect(result.status).toBe(200);
    expect(result.body.payload.isSucceed).toBeDefined();
    expect(result.body.message).toBe("User validation successfully, you now have Rp.1.000.000 free balance.");
  });

  it("Should reject if request is invalid", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }

    const request: IVerifyUserBody = {
      userBio: "",
      userCity: "",
      userCityId: 0,
      userId: "",
      userProvince: "",
      userProvinceId: 1,
      userShopDesc: "",
    };

    const result: Response = await supertest(app).post("/v1/verification").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});
