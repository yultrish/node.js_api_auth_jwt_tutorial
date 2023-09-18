// Validation
const Joi = require('@hapi/joi');

// Define the registration schema outside the function
const registerSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
});

// Register validation function
const registerValidation = (data) => {
  return registerSchema.validate(data);
};

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
});

const loginValidation = (data) => {
  return loginSchema.validate(data);
};

module.exports = { registerValidation, loginValidation };

