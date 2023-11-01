//@ts-ignore
import Joi from "joi";

export const POSTCartValidation = Joi.object({
  cartId: Joi.string().max(14).optional(),
  userId: Joi.string().max(14).required(),
  productId: Joi.string().max(14).required(),
  productQuantity: Joi.number().max(9999999999).required(),
});

export const PUTCartValidation = Joi.object({
  cartId: Joi.string().max(14).required(),
  userId: Joi.string().max(14).required(),
  productId: Joi.string().max(14).required(),
  productQuantity: Joi.number().max(9999999999).required(),
});

export const DELETECartValidation = Joi.object({
  cartId: Joi.string().max(14).required(),
  userId: Joi.string().max(14).required(),
});
