import Joi from "joi";
export const registerUserValidation = Joi.object({
    userName: Joi.string()
        .max(50)
        .required()
        .custom((value, helpers) => {
        if (value !== value.toLowerCase()) {
            return helpers.message({ custom: "userName must be lowercase" });
        }
        return value.toLowerCase();
    })
        .messages({
        "string.custom": "{{#custom}}",
    }),
    userPassword: Joi.string()
        .min(8)
        .max(100)
        .required()
        .custom((value, helpers) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasThreeNumbers = /\d.*\d.*\d/.test(value);
        const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value);
        if (hasUpperCase && hasLowerCase && hasThreeNumbers && hasSymbol) {
            return value;
        }
        else {
            const errorMessage = [];
            if (!hasUpperCase) {
                errorMessage.push("at least 1 uppercase letter");
            }
            if (!hasLowerCase) {
                errorMessage.push("at least 1 lowercase letter");
            }
            if (!hasThreeNumbers) {
                errorMessage.push("at least 3 numbers");
            }
            if (!hasSymbol) {
                errorMessage.push("at least 1 symbol");
            }
            return helpers.message({
                custom: `Password must contain ${errorMessage.join(", ")}.`,
            });
        }
    })
        .messages({
        "string.custom": "{{#custom}}",
    }),
});
export const loginUserValidation = Joi.object({
    userName: Joi.string()
        .max(50)
        .required()
        .custom((value, helpers) => {
        if (value !== value.toLowerCase()) {
            return helpers.message({ custom: "userName must be lowercase" });
        }
        return value.toLowerCase();
    })
        .messages({
        "string.custom": "{{#custom}}",
    }),
    userPassword: Joi.string().max(50).required(),
});
