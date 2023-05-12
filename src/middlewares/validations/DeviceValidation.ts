import Joi from 'joi';
import { deviceSchema } from '../../utils/validations/index';
import ValidationBody from './ValidationBody';

export default class DeviceValidation extends ValidationBody {
  constructor(schema: Joi.ObjectSchema = deviceSchema) {
    super(schema);
  }
}
