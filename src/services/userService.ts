import PREFIX from "../const/prefix";
import userDatabase from "../database/user/userDatabase";
import { IRegisterUserBody } from "../interfaces/user/IRegisterUserBody";
import { getNanoid } from "../utils/getNanoid";
import { validate } from "../utils/validation";
import { ServiceError } from "../error/serviceError";
import { ILoginUserBody } from "../interfaces/user/ILoginUserBody";
import { loginUserValidation } from "../validation/userValidation";
import { registerUserValidation } from "../validation/userValidation";
import { IResponseGetProduct } from "../interfaces/product/IProductResponse";
import { IResponseUserServiceAccount, IResponseUserUnverified } from "../interfaces/user/IUserResponse";

const register = async (req: IRegisterUserBody): Promise<{ userName: string }> => {
  const user = validate(registerUserValidation, req);

  user.userId = PREFIX.USER + getNanoid();

  await userDatabase.register(user);
  const userName = await userDatabase.getUserName(user.userName);

  return userName;
};

const login = async (req: ILoginUserBody): Promise<{ userName: string }> => {
  const loginRequest = validate(loginUserValidation, req);

  const userName = await userDatabase.login(loginRequest);

  if (userName === undefined) {
    throw new ServiceError(401, "Unauthorized");
  }

  return userName;
};

const getUserPage = async (req: { userName: string } | any): Promise<IResponseGetProduct | IResponseUserUnverified> => {
  const { userName } = req;

  const userProduct = await userDatabase.getProducts(userName);

  const userPage = await userDatabase.getPage(userName);

  // @ts-ignore
  if (userPage.length === 0) {
    throw new ServiceError(404, "User not found.");
  }

  // @ts-ignore
  const { userImage, userBanner, userBio, userShopDescription, totalRating } = userPage[0];

  // @ts-ignore
  if (userProduct.length === 0) {
    const response = {
      userImage,
      userName,
    };

    return response;
  }

  const { userProvince, userCity } = await userDatabase.getAddress(userName);

  //@ts-ignore
  if (!userProduct[0].productId) {
    //@ts-ignore
    return userProduct[0].userName;
  }

  const response: IResponseGetProduct | any = {
    userName,
    userImage,
    userBanner,
    userBio,
    userShopDescription,
    userProvince,
    userCity,
    totalRating,
    userProduct,
  };

  return response;
};

const getAddress = async (req: { userName: string } | any): Promise<IResponseUserServiceAccount> => {
  const { userName } = req;

  const userAddress = await userDatabase.getAddress(userName);

  if (!userAddress) {
    throw new ServiceError(404, "user not found.");
  }

  return userAddress;
};

export default { register, login, getUserPage, getAddress };
