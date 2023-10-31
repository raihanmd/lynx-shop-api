//@ts-ignore
import Joi from "joi";

export const POSTProductValidation = Joi.object({
  productId: Joi.string().max(14).optional(),
  productSlug: Joi.string().max(100).optional(),
  createdAt: Joi.number().max(9999999999).optional(),
  userId: Joi.string().max(14).required(),
  productName: Joi.string().max(255).required(),
  productPrice: Joi.number().max(99999999999999999999).required(),
  productCategory: Joi.string().max(14).required(),
  productDescription: Joi.string().max(65535).required(),
  productQuantity: Joi.number().max(9999999999).required(),
  productWeight: Joi.number().max(9999999999).required(),
  productImage: Joi.string().max(500).required(),
  blurhash: Joi.string().max(100).required(),
});

export const PUTProductValidation = Joi.object({
  userId: Joi.string().max(14).required(),
  productId: Joi.string().max(14).required(),
  productName: Joi.string().max(255).required(),
  productPrice: Joi.number().max(99999999999999999999).required(),
  productCategory: Joi.string().max(14).required(),
  productDescription: Joi.string().max(65535).required(),
  productQuantity: Joi.number().max(9999999999).required(),
  productWeight: Joi.number().max(9999999999).required(),
});

export const DELETEProductValidation = Joi.object({
  userId: Joi.string().max(14).required(),
  productId: Joi.string().max(14).required(),
});
