import bcrypt from "bcrypt";

import { PREFIX } from "../const/prefix.js";
import { validate } from "../utils/validation.js";
import { getNanoid } from "../utils/getNanoid.js";
import { ServiceError } from "../error/serviceError.js";
import { loginUserValidation, registerUserValidation } from "../validation/userValidation.js";
import { IRegisterLoginUserBody } from "../interfaces/user/IRegisterLoginUserBody.js";
import userDatabase from "../database/user/userDatabase.js";

const register = async (req: IRegisterLoginUserBody) => {
  const user = validate(registerUserValidation, req);

  // if (isExist?.length === 1) throw new ServiceError(400, "Username already exists");

  user.userId = PREFIX.USER + getNanoid();

  await userDatabase.registerUser(user);

  // if (newUserError) throw new Error();

  // return newUser[0];
};

const login = async (req: IRegisterLoginUserBody) => {
  const loginRequest = validate(loginUserValidation, req);

  // if (!user || user.length === 0) throw new ServiceError(401, "Username or password wrong");

  // if (!isPasswordValid) throw new ServiceError(401, "Username or password wrong");

  // return user[0];
};

export default { register, login };
