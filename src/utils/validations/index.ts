import Joi from 'joi';

export const loginSchema = Joi.object().keys({
  username: Joi.string().min(4).required(),
  password: Joi.string().min(4).required()
});

export const authorizationSchema = Joi.object().keys({
  authorization: Joi.string().min(8).max(16).required()
}).options({
  stripUnknown: true
});