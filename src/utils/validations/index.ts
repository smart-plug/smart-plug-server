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

export const userSchema = Joi.object().keys({
  authorization: Joi.string().min(8).max(16).required(),
  user_id: Joi.string().min(1).required()
}).options({
  stripUnknown: true
});

export const deviceSchema = Joi.object().keys({
  deviceId: Joi.number().min(1).required(),
  name: Joi.string().min(4)
});

export const statusSchema = Joi.object().keys({
  deviceId: Joi.number().min(1).required(),
  state: Joi.boolean().required()
});