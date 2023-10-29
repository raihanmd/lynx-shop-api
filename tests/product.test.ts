import supertest, { Response } from "supertest";

import { app } from "../src/app";
import { IDELETEProductBody, IPOSTProductBody, IPUTProductBody } from "../src/interfaces/product/IProductBody";

describe("GET /v1/product", () => {
  // it("should get products", async () => {
  //   const result: Response = await supertest(app).get("/v1/product");
  //   expect(result.status).toBe(200);
  //   expect(result.body.payload).toBeDefined();
  // });
  // it("should success insert product", async () => {
  //   if (!process.env.API_KEY) {
  //     throw new Error("API_KEY is not defined in the environment variables.");
  //   }
  //   const request: IPOSTProductBody = {
  //     productName: "test",
  //     productCategory: "test",
  //     productDescription: "test",
  //     productImage: "test",
  //     productPrice: 1,
  //     productQuantity: 1,
  //     productWeight: 1,
  //     userId: "test",
  //     blurhash: "test",
  //   };
  //   const result: Response = await supertest(app).post("/v1/product").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
  //   expect(result.status).toBe(200);
  //   expect(result.body.payload).toBeDefined();
  //   expect(result.body.message).toBe("Product added successfully.");
  // });
  // it("should success insert product", async () => {
  //   if (!process.env.API_KEY) {
  //     throw new Error("API_KEY is not defined in the environment variables.");
  //   }
  //   const request: IPUTProductBody = {
  //     productId: "testChange",
  //     productName: "testChange",
  //     productCategory: "testChange",
  //     productDescription: "testChange",
  //     productPrice: 1,
  //     productQuantity: 1,
  //     productWeight: 1,
  //     userId: "testChange",
  //   };
  //   const result: Response = await supertest(app).put("/v1/product").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
  //   expect(result.status).toBe(200);
  //   expect(result.body.payload).toBeDefined();
  //   expect(result.body.message).toBe("Product updated successfully.");
  // });
  // it("should success delete product", async () => {
  //   if (!process.env.API_KEY) {
  //     throw new Error("API_KEY is not defined in the environment variables.");
  //   }
  //   const request: IDELETEProductBody = {
  //     productId: "testChange",
  //     userId: "testChange",
  //   };
  //   const result: Response = await supertest(app).delete("/v1/product").send(request).set("API-Key", process.env.API_KEY).set("Content-Type", "application/json");
  //   expect(result.status).toBe(200);
  //   expect(result.body.payload).toBeDefined();
  //   expect(result.body.message).toBe("Product deleted successfully.");
  // });
});
