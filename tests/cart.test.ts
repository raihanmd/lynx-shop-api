import supertest, { Response } from "supertest";

import { app } from "../src/app";
import { createTestUser, deleteTestUser } from "./testUtils";
import { IPOSTCartBody } from "../src/interfaces/cart/ICartBody";

beforeAll(async () => {
  await createTestUser();
});

afterAll(async () => {
  await deleteTestUser();
});

describe("GET /v1/cart/:userName", () => {
  it("should get cart user", async () => {
    const result: Response = await supertest(app).get("/v1/cart/test");

    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
  });

  it("should return 404", async () => {
    const result: Response = await supertest(app).get("/v1/cart/wrong");

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });
});

describe("POST /v1/cart", () => {
  // it('should success insert cart', () => {
  //     if (!process.env.API_KEY) {
  //         throw new Error("API_KEY is not defined in the environment variables.");
  //       }
  //     const request: IPOSTCartBody = {
  //           idProduct: ''
  //       };
  //       const result: Response = await supertest(app).post("/v1/register").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
  //       expect(result.status).toBe(200);
  //       expect(result.body.payload.userName).toBeDefined();
  //       expect(result.body.payload.userName).toBe("test");
  // });
});
