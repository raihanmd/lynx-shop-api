import supertest, { Response } from "supertest";

import { app } from "../src/app";
import { IDELETEProductBody, IPOSTProductBody, IPUTProductBody } from "../src/interfaces/product/IProductBody";
import { createTestCategory, createTestProduct, createTestUser, deleteTestCategory, deleteTestUser, verifyTestUser } from "./testUtils";

beforeAll(async () => {
  await createTestUser();
  await verifyTestUser();
  await createTestCategory();
});

afterAll(async () => {
  await deleteTestUser();
  await deleteTestCategory();
});

describe("GET /v1/product", () => {
  it("should get products", async () => {
    const result: Response = await supertest(app).get("/v1/product");
    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
  });
});

describe("POST /v1/product", () => {
  it("Should success insert product", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPOSTProductBody = {
      productName: "test",
      productCategory: "test",
      productDescription: "test",
      productImage: "test",
      productPrice: 1,
      productQuantity: 1,
      productWeight: 1,
      userId: "test",
      blurhash: "test",
    };
    const result: Response = await supertest(app).post("/v1/product").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
    expect(result.body.message).toBe("Product added successfully.");
  });

  it("Should return 404 if category not found", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPOSTProductBody = {
      productName: "test",
      productCategory: "wrong",
      productDescription: "test",
      productImage: "test",
      productPrice: 1,
      productQuantity: 1,
      productWeight: 1,
      userId: "test",
      blurhash: "test",
    };
    const result: Response = await supertest(app).post("/v1/product").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(404);
    expect(result.body.error).toBe("Category not found.");
  });

  it("Should reject if request is invalid", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPOSTProductBody = {
      productName: "",
      productCategory: "",
      productDescription: "",
      productImage: "",
      productPrice: 1,
      productQuantity: 1,
      productWeight: 1,
      userId: "",
      blurhash: "",
    };
    const result: Response = await supertest(app).put("/v1/product").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});

describe("PUT /v1/product", () => {
  beforeAll(async () => {
    await createTestProduct();
  });

  it("Should success update product", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPUTProductBody = {
      productId: "test",
      productName: "test",
      productCategory: "test",
      productDescription: "testChange",
      productPrice: 1000,
      productQuantity: 1000,
      productWeight: 1000,
      userId: "test",
    };
    const result: Response = await supertest(app).put("/v1/product").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
    expect(result.body.message).toBe("Product updated successfully.");
  });

  it("Should return 404 if category not found", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPUTProductBody = {
      productId: "test",
      productName: "test",
      productCategory: "wrong",
      productDescription: "testChange",
      productPrice: 1000,
      productQuantity: 1000,
      productWeight: 1000,
      userId: "test",
    };
    const result: Response = await supertest(app).put("/v1/product").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(404);
    expect(result.body.error).toBe("Category not found.");
  });

  it("Should reject if request is invalid", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPUTProductBody = {
      productId: "",
      productName: "",
      productCategory: "",
      productDescription: "",
      productPrice: 1000,
      productQuantity: 1000,
      productWeight: 1000,
      userId: "",
    };
    const result: Response = await supertest(app).put("/v1/product").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});

describe("GET /v1/:userName/:slugProduct", () => {
  it("should get product", async () => {
    const result: Response = await supertest(app).get("/v1/test/test");
    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
  });
});

describe("DELETE /v1/product", () => {
  it("Should success delete product", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IDELETEProductBody = {
      productId: "test",
      userId: "test",
    };
    const result: Response = await supertest(app).delete("/v1/product").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
    expect(result.body.message).toBe("Product deleted successfully.");
  });
});
