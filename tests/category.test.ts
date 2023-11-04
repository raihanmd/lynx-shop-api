import supertest, { Response } from "supertest";
import { app } from "../src/app";

describe("GET /v1/category", () => {
  it("Should get categories", async () => {
    const result: Response = await supertest(app).get("/v1/category");
    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
  });
});

describe("GET /v1/category/:category", () => {
  it("Should get product by category", async () => {
    const result: Response = await supertest(app).get("/v1/category/lain-lain");
    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
  });

  it("Should return 404 if category not found", async () => {
    const result: Response = await supertest(app).get("/v1/category/wrong");
    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });
});
