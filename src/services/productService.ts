import productDatabase from "../database/product/productDatabase.js";

export const getAll = async (): Promise<Array<object>> => {
  const products = await productDatabase.getAll();

  return products;
};

export default { getAll };
