import Joi from "joi";

export const POSTCartValidation = Joi.object({
  idCart: Joi.string().max(14).optional(),
  idUser: Joi.string().max(14).required(),
  idProduct: Joi.string().max(14).required(),
  quantityProduct: Joi.number().max(10).required(),
});

export const PUTCartValidation = Joi.object({
  idCart: Joi.string().max(14).required(),
  idUser: Joi.string().max(14).required(),
  idProduct: Joi.string().max(14).required(),
  quantityProduct: Joi.number().max(10).required(),
});

export const DELETECartValidation = Joi.object({
  idCart: Joi.string().max(14).required(),
  idUser: Joi.string().max(14).required(),
});
