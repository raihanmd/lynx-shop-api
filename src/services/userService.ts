import PREFIX from "../const/prefix.js";
import userDatabase from "../database/user/userDatabase.js";
import { IRegisterUserBody } from "../interfaces/user/IRegisterLoginUserBody.js";
import { getNanoid } from "../utils/getNanoid.js";
import { validate } from "../utils/validation.js";
import { ServiceError } from "../error/serviceError.js";
import { ILoginUserBody } from "../interfaces/user/ILoginUserBody.js";
import { loginUserValidation } from "../validation/userValidation.js";
import { registerUserValidation } from "../validation/userValidation.js";
import { IResponseGetProduct, IResponseUserUnverified } from "../interfaces/product/IProductResponse.js";
import { IResponseUserServiceAccount } from "../interfaces/user/IUserResponse.js";

const register = async (req: IRegisterUserBody): Promise<{ userName: string }> => {
  const user = validate(registerUserValidation, req);

  user.userId = PREFIX.USER + getNanoid();

  const { userName } = await userDatabase.register(user);

  return userName;
};

const login = async (req: ILoginUserBody): Promise<{ userName: string }> => {
  const loginRequest = validate(loginUserValidation, req);

  const { userName } = await userDatabase.login(loginRequest);

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
