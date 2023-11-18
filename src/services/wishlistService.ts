import { validate } from "../utils/validation";
import { ServiceError } from "../error/serviceError";
import PREFIX from "../const/prefix";
import { getUuid } from "../utils/getUuid";
import userDatabase from "../database/user/userDatabase";
import wishlistDatabase from "../database/wishlist/wishlistDatabase";
import { IDELETEWishlistBody, IPOSTWishlistBody } from "../interfaces/wishlist/IWishlistBody";
import { DELETEWishlistValidation, POSTWishlistValidation } from "../validation/wishlistValidation";

const get = async (req: { userName: string }): Promise<string> => {
  const { userName } = req;

  const isUserExist = await userDatabase.getUserName(userName);

  //@ts-ignore
  if (!isUserExist) {
    throw new ServiceError(404, "User not found.");
  }

  const userWishlist = await wishlistDatabase.get(userName);

  //@ts-ignore
  if (userWishlist.length === 0) {
    return "User wishlist empty.";
  }

  //@ts-ignore
  return userWishlist;
};

const insertOne = async (req: IPOSTWishlistBody): Promise<object> => {
  const wishlistBody = validate(POSTWishlistValidation, req);

  wishlistBody.cartId = PREFIX.CART + getUuid();
  await wishlistDatabase.insertOne(wishlistBody);

  return { isSucceed: true };
};

const deleteOne = async (req: IDELETEWishlistBody): Promise<object> => {
  const wishlistBody = validate(DELETEWishlistValidation, req);

  await wishlistDatabase.deleteOne(wishlistBody);

  return { isSucceed: true };
};

export default { get, insertOne, deleteOne };
