//@ts-ignore
import Joi from "joi";

export const registerUserValidation = Joi.object({
  userId: Joi.string().max(14).optional(),
  userOAuthId: Joi.string().max(100).required(),
  userEmail: Joi.string().max(100).required(),
  userName: Joi.string().max(100).required(),
  userProvider: Joi.string().max(50).required(),
  userImage: Joi.string().max(255).required(),
});

export const loginUserValidation = Joi.object({
  userOAuthId: Joi.string().max(100).required(),
  userEmail: Joi.string().max(100).required(),
  userProvider: Joi.string().max(50).required(),
});

export const verifyUserValidation = Joi.object({
  userId: Joi.string().max(14).required(),
  userProvince: Joi.string().max(50).required(),
  userProvinceId: Joi.number().max(10).required(),
  userCity: Joi.string().max(50).required(),
  userCityId: Joi.number().max(10).required(),
  userBio: Joi.string().max(50).required(),
  userShopDesc: Joi.string().max(255).required(),
});
