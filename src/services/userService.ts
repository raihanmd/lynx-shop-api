import bcrypt from "bcrypt";

import { PREFIX } from "../const/prefix.js";
import { supabase } from "../config/supabase.js";
import { validate } from "../utils/validation.js";
import { getNanoid } from "../utils/getNanoid.js";
import { ServiceError } from "../error/serviceError.js";
import { loginUserValidation, registerUserValidation } from "../validation/userValidation.js";

interface IRegisterLoginUserBody {
  username: string;
  password: string;
}

const register = async (req: IRegisterLoginUserBody): Promise<{ username: string }> => {
  const user = validate(registerUserValidation, req);

  const { data: isExist } = await supabase.from("user").select("username").eq("username", user.userName);

  if (isExist?.length === 1) throw new ServiceError(400, "Username already exists");

  user.userId = PREFIX.USER + getNanoid();
  user.userPassword = await bcrypt.hash(user.userPassword, 10);

  const { data: newUser, error: newUserError } = await supabase
    .from("user")
    .insert([{ id: user.userId, username: user.userName, password: user.userPassword }])
    .select("username");

  if (newUserError) throw new Error();

  return newUser[0];
};

const login = async (req: IRegisterLoginUserBody): Promise<{ username: string }> => {
  const loginRequest = validate(loginUserValidation, req);

  const { data: user } = await supabase.from("user").select("username,password").eq("username", loginRequest.userName);

  if (!user || user.length === 0) throw new ServiceError(401, "Username or password wrong");

  const isPasswordValid = await bcrypt.compare(loginRequest.userPassword, user[0]?.password);

  if (!isPasswordValid) throw new ServiceError(401, "Username or password wrong");

  return user[0];
};

export default { register, login };
