import Joi from "joi";

const registerSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-z0-9_-]{3,15}$/)
    .required()
    .trim()
    .messages({
      "string.empty": "Username is required",
      "string.pattern.base":
        "Username requires 4 to 15 characters including numbers",
    }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must have at least 6 characters containing alphabets and numbers",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Confirm password is required",
    "any.only": "Password and confirm password did not match",
  }),
  phone: Joi.string()
    .allow("")
    .optional()
    .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .messages({
      "string.pattern.base": "Phone Number must be valid including 10 numbers",
    }),
  email: Joi.string().required().email({ tlds: false }).messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, {
    abortEarly: false,
  });
  // console.dir(error);
  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateRegister;
