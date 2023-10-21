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
