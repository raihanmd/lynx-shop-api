import Joi from "joi";

export const POSTWishlistValidation = Joi.object({
  userId: Joi.string().max(14).required(),
  productId: Joi.string().max(14).required(),
});

export const DELETEWishlistValidation = Joi.object({
  userId: Joi.string().max(14).required(),
  productId: Joi.string().max(14).required(),
});
