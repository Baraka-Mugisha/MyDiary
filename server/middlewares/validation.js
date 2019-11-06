import Joi from 'joi';
import response from './ValidationReturn';
import statusCode from '../helpers/statusMessages';

const validate = {
  user_sign_up: Joi.object().keys({
    firstName: Joi.string().regex(/^\w+(\.\w+|\s\w)*[^\s\.][^\d]+/).min(1).max(30)
      .required(),
    lastName: Joi.string().regex(/^\w+(\.\w+|\s\w)*[^\s\.][^\d]+/).min(1).max(30)
      .required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
    token: [Joi.string(), Joi.number()],
  }),
  user_sign_in: Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    token: [Joi.string(), Joi.number()],
  }),
  entries: Joi.object().keys({
    id: Joi.string().regex(/^[0-9 ]*$/).min(1).max(30),
    title: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).min(1).max(30)
      .required(),
    description: Joi.string().min(1).max(1000).required(),
    entry_id: Joi.number().min(1).max(10),
  }),
  entryId: Joi.object().keys({
    id: Joi.string().regex(/^[0-9 ]*$/).min(1).max(30)
  }),

  ValidateSignUp(req, res, _next) {
    const {
      email, firstName, lastName, password
    } = req.body;
    const result = Joi.validate({
      email, firstName, lastName, password
    }, validate.user_sign_up);
    if (result.error) {
      return response.Validation(res, statusCode.BadRequest, result);
    }
    return _next();
  },
  ValidateSignIn(req, res, _next) {
    const { email, password } = req.body;

    const result = Joi.validate({ email, password }, validate.user_sign_in);
    if (result.error) {
      return response.Validation(res, statusCode.BadRequest, result);
    }
    return _next();
  },
  ValidateCreateEntry(req, res, _next) {
    const { title, description } = req.body;

    const result = Joi.validate({ title, description }, validate.entries);
    if (result.error) {
      return response.Validation(res, statusCode.BadRequest, result);
    }
    return _next();
  },
  ValidateSpecificEntry(req, res, _next) {
    const id = req.params.entry_id;

    const result = Joi.validate({ id }, validate.entryId);
    if (result.error) {
      return response.Validation(res, statusCode.BadRequest, result);
    }
    return _next();
  },
  ValidateModifyEntry(req, res, _next) {
    const { title, description } = req.body;
    const id = req.params.entry_id;

    const result = Joi.validate({ id, title, description }, validate.entries);
    if (result.error) {
      return response.Validation(res, statusCode.BadRequest, result);
    }
    return _next();
  },
  ValidateDeleteEntry(req, res, _next) {
    const id = req.params.entry_id;

    const result = Joi.validate({ id }, validate.entryId);
    if (result.error) {
      return response.Validation(res, statusCode.BadRequest, result);
    }
    return _next();
  },
};

export default validate;
