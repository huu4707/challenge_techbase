import Joi from '@hapi/joi';

const registerSchema = Joi.object({
  email: Joi.string()
    .required()
    .regex(/^[a-z][a-z0-9_\.]{4,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)
    .label('email'),
  name: Joi.string()
    .required()
    .label('name'),
  password: Joi.string()
    .required()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
    .label('password')
});

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .regex(/^[a-z][a-z0-9_\.]{4,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)
    .label('Email'),
  password: Joi.string()
    .required()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
    .label('password')
});

export { registerSchema, loginSchema };
