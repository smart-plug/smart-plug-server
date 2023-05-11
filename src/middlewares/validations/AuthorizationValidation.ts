import Joi from 'joi';
import { authorizationSchema } from '../../utils/validations/index';
import ValidationHeader from './ValidationHeader';

export default class AuthorizationValidation extends ValidationHeader {
  constructor(schema: Joi.ObjectSchema = authorizationSchema) {
    super(schema);
  }
}
