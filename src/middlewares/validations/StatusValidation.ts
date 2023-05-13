import Joi from 'joi';
import { statusSchema } from '../../utils/validations/index';
import ValidationBody from './ValidationBody';

export default class StatusValidation extends ValidationBody {
  constructor(schema: Joi.ObjectSchema = statusSchema) {
    super(schema);
  }
}
