import Joi from "joi";

export const POSTReviewValidation = Joi.object({
  userId: Joi.string().max(14).required(),
  productId: Joi.string().max(14).required(),
  reviewsRating: Joi.number().max(5).required(),
  reviewsComment: Joi.string().max(65535).required(),
  createdAt: Joi.number().max(9999999999).required(),
});

export const PUTReviewValidation = Joi.object({
  userId: Joi.string().max(14).required(),
  productId: Joi.string().max(14).required(),
  reviewsRating: Joi.number().max(5).required(),
  reviewsComment: Joi.string().max(65535).required(),
  updatedAt: Joi.number().max(9999999999).required(),
});
