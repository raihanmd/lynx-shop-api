import categoryDatabase from "../database/category/categoryDatabase";
import { ServiceError } from "../error/serviceError";

const getCategory = async (): Promise<Array<object>> => {
  const categories = await categoryDatabase.getAll();

  //@ts-ignore
  return categories;
};

const getProduct = async (req: { category: string }): Promise<object[]> => {
  const { category } = req;

  const products = await categoryDatabase.getProduct(category.toLowerCase());
  //@ts-ignore
  if (products.length === 0) {
    throw new ServiceError(404, "Category not found");
  }
  //@ts-ignore
  return products;
};

export default { getCategory, getProduct };
