import Joi from '@hapi/joi';

const createSchema = Joi.object({
  name: Joi.string()
    .required()
    .label('name'),
  price: Joi.number()
    .required()
    .positive()
    .label('price')
});

const updateSchema = Joi.object({
  id: Joi.number()
    .required()
    .label('id'),
  name: Joi.string()
    .required()
    .label('name'),
  price: Joi.number()
    .required()
    .positive()
    .label('price')
});

const medicineIdSchema = Joi.number()
  .required()
  .label('medicineId');

export { createSchema, updateSchema, medicineIdSchema };
