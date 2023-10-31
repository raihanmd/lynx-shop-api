import PREFIX from "../const/prefix";
import userDatabase from "../database/user/userDatabase";
import { getUuid } from "../utils/getUuid";
import { validate } from "../utils/validation";
import { ServiceError } from "../error/serviceError";
import { loginUserValidation, verifyUserValidation } from "../validation/userValidation";
import { registerUserValidation } from "../validation/userValidation";
import { IResponseGetProduct } from "../interfaces/product/IProductResponse";
import { IResponseUserServiceAccount, IResponseUserUnverified } from "../interfaces/user/IUserResponse";
import { ILoginUserBody, IRegisterUserBody, IVerifyUserBody } from "../interfaces/user/IUserBody";

const verify = async (req: IVerifyUserBody): Promise<object> => {
  const userBody = validate(verifyUserValidation, req);

  await userDatabase.verify(userBody);

  return { isSucceed: true };
};

const register = async (req: IRegisterUserBody): Promise<{ userName: string }> => {
  const userBody = validate(registerUserValidation, req);

  userBody.userId = PREFIX.USER + getUuid();

  await userDatabase.register(userBody);
  const userName = await userDatabase.getUserName(userBody.userName);

  return userName;
};

const login = async (req: ILoginUserBody): Promise<{ userName: string }> => {
  const userBody = validate(loginUserValidation, req);

  const userName = await userDatabase.login(userBody);

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

export default { verify, register, login, getUserPage, getAddress };
