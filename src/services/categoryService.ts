import categoryDatabase from "../database/category/categoryDatabase";

const getCategory = async (): Promise<Array<object>> => {
  const categories = await categoryDatabase.getAll();

  //@ts-ignore
  return categories;
};

const getProduct = async (req: { category: string }): Promise<object[] | string> => {
  const { category } = req;

  const products = await categoryDatabase.getProduct(category.toLowerCase());

  //@ts-ignore
  return products;
};

export default { getCategory, getProduct };
