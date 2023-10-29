import supertest, { Response } from "supertest";

import { app } from "../src/app";
import { createTestUser, deleteTestUser } from "./testUtils";

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
});
