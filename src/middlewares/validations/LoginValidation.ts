import Joi from 'joi';
import { loginSchema } from '../../utils/validations/index';
import ValidationBody from './ValidationBody';

export default class LoginValidation extends ValidationBody {
  constructor(schema: Joi.ObjectSchema = loginSchema) {
    super(schema);
  }
}
