import supertest, { Response } from "supertest";

import { app } from "../src/app";
import { createTestCart, createTestCategory, createTestProduct, createTestUser, deleteTestCategory, deleteTestUser, verifyTestUser } from "./testUtils";
import { IDELETECartBody, IPOSTCartBody, IPUTCartBody } from "../src/interfaces/cart/ICartBody";

beforeAll(async () => {
  await createTestUser();
  await verifyTestUser();
  await createTestCategory();
  await createTestProduct();
});

afterAll(async () => {
  await deleteTestUser();
  await deleteTestCategory();
});

describe("GET /v1/cart/:userName", () => {
  it("Should get cart user", async () => {
    const result: Response = await supertest(app).get("/v1/cart/test");

    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
  });

  it("Should return 404", async () => {
    const result: Response = await supertest(app).get("/v1/cart/wrong");

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });
});

describe("POST /v1/cart", () => {
  it("Should success add to cart", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPOSTCartBody = {
      productId: "test",
      userId: "test",
      productQuantity: 1,
    };

    const result: Response = await supertest(app).post("/v1/cart").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
    expect(result.body.message).toBe("Cart added successfully.");
  });

  it("Should return 404 if product not found", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPOSTCartBody = {
      productId: "wrong",
      userId: "test",
      productQuantity: 1,
    };

    const result: Response = await supertest(app).post("/v1/cart").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(404);
    expect(result.body.error).toBe("Product not found.");
  });

  it("Should return 400 if product quantity is lesser than cart request", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPOSTCartBody = {
      productId: "test",
      userId: "test",
      productQuantity: 99999,
    };

    const result: Response = await supertest(app).post("/v1/cart").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Quantity of product is lesser than you try to order.");
  });

  it("Should reject if request is invalid", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPOSTCartBody = {
      productId: "",
      userId: "",
      productQuantity: 0,
    };

    const result: Response = await supertest(app).post("/v1/cart").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});

describe("PUT /v1/cart", () => {
  beforeAll(async () => {
    await createTestCart();
  });

  it("Should success update cart", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPUTCartBody = {
      cartId: "test",
      productId: "test",
      productQuantity: 5,
      userId: "test",
    };

    const result: Response = await supertest(app).put("/v1/cart").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");

    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
    expect(result.body.message).toBe("Cart updated successfully.");
  });

  it("Should return 404 if product not found", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPUTCartBody = {
      cartId: "test",
      productId: "wrong",
      productQuantity: 5,
      userId: "test",
    };

    const result: Response = await supertest(app).put("/v1/cart").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(404);
    expect(result.body.error).toBe("Product not found.");
  });

  it("Should return 400 if product quantity is lesser than cart request", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPUTCartBody = {
      cartId: "test",
      productId: "test",
      productQuantity: 999999,
      userId: "test",
    };

    const result: Response = await supertest(app).put("/v1/cart").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Quantity of product is lesser than you try to order.");
  });

  it("Should return 403 if user not found or cartId invalid", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPUTCartBody = {
      cartId: "wrong",
      productId: "test",
      productQuantity: 5,
      userId: "wrong",
    };

    const result: Response = await supertest(app).put("/v1/cart").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(403);
    expect(result.body.error).toBe("Failed to update data.");
  });

  it("Should reject if request is invalid", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IPUTCartBody = {
      cartId: "",
      productId: "",
      productQuantity: 5,
      userId: "",
    };

    const result: Response = await supertest(app).put("/v1/cart").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});

describe("DELETE /v1/cart", () => {
  it("Should success delete cart", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IDELETECartBody = {
      cartId: "test",
      userId: "test",
    };
    const result: Response = await supertest(app).delete("/v1/cart").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(200);
    expect(result.body.payload).toBeDefined();
    expect(result.body.message).toBe("Cart deleted successfully.");
  });

  it("Should reject if request is invalid", async () => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment variables.");
    }
    const request: IDELETECartBody = {
      cartId: "",
      userId: "",
    };
    const result: Response = await supertest(app).delete("/v1/cart").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});
