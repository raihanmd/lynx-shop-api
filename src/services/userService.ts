import PREFIX from "../const/prefix.js";
import userDatabase from "../database/user/userDatabase.js";
import { IRegisterUserBody } from "../interfaces/user/IRegisterLoginUserBody.js";
import { getNanoid } from "../utils/getNanoid.js";
import { validate } from "../utils/validation.js";
import { ServiceError } from "../error/serviceError.js";
import { ILoginUserBody } from "../interfaces/user/ILoginUserBody.js";
import { loginUserValidation } from "../validation/userValidation.js";
import { registerUserValidation } from "../validation/userValidation.js";

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

export default { register, login };
