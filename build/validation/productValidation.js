import Joi from "joi";
export const postProductValidation = Joi.object({
    productId: Joi.string().max(14).optional(),
    productSlug: Joi.string().max(100).optional(),
    createdAt: Joi.number().max(10).optional(),
    userId: Joi.string().max(14).required(),
    productName: Joi.string().max(255).required(),
    productPrice: Joi.number().max(20).required(),
    productCategory: Joi.string().max(14).required(),
    productDescription: Joi.string().max(65535).required(),
    productQuantity: Joi.number().max(10).required(),
    productWeight: Joi.number().max(10).required(),
    productImage: Joi.string().max(500).required(),
    blurhash: Joi.string().max(100).required(),
});
