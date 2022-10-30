import joi from "joi";

const signupValidator = joi.object({
    userName: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    firstName: joi.string()
        .required(),
    lastName: joi.string()
        .required(),
    email: joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")),
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    confirmPassword: joi.ref('password')
});

export default signupValidator;


