import Joi from "joi";

export const POSTOrderValidation = Joi.object({
  userId: Joi.string().max(14).required(),
  productId: Joi.string().max(14).required,
  productQuantity: Joi.number().max(9999999999).required(),
});

export const CheckoutOrderValidation = Joi.object({
  userId: Joi.string().max(14).required(),
  orderId: Joi.string().max(14).required,
  checkoutAt: Joi.number().max(9999999999).required(),
});
