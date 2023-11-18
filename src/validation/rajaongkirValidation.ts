import Joi from "joi";

export const COSTRajaongkirValidation = Joi.object({
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  weight: Joi.number().required(),
});
