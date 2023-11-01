import userDatabase from "../database/user/userDatabase";
import cartDatabase from "../database/cart/cartDatabase";
import { validate } from "../utils/validation";
import { ServiceError } from "../error/serviceError";
import { DELETECartValidation, POSTCartValidation, PUTCartValidation } from "../validation/cartValidation";
import { IDELETECartBody, IPOSTCartBody, IPUTCartBody } from "../interfaces/cart/ICartBody";
import PREFIX from "../const/prefix";
import { getUuid } from "../utils/getUuid";

const get = async (req: { userName: string }): Promise<object[] | string> => {
  const { userName } = req;

  const isUserExist = await userDatabase.getUserName(userName);

  //@ts-ignore
  if (!isUserExist) {
    throw new ServiceError(404, "User not found.");
  }

  const userCart = await cartDatabase.get(userName);

  //@ts-ignore
  if (userCart.length === 0) {
    return "User cart empty.";
  }

  //@ts-ignore
  return userCart;
};

const insertOne = async (req: IPOSTCartBody): Promise<object> => {
  const cartBody = validate(POSTCartValidation, req);

  cartBody.cartId = PREFIX.CART + getUuid();
  await cartDatabase.insertOne(cartBody);

  return { isSucceed: true };
};

const update = async (req: IPUTCartBody): Promise<object> => {
  const productBody = validate(PUTCartValidation, req);

  await cartDatabase.updateOne(productBody);

  return { isSucceed: true };
};

const deleteOne = async (req: IDELETECartBody): Promise<object> => {
  const productBody = validate(DELETECartValidation, req);

  await cartDatabase.deleteOne(productBody);

  return { isSucceed: true };
};

export default { get, insertOne, update, deleteOne };
