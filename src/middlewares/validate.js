const Joi = require('joi');
const { pick } = require('../utils');
const { ApiError } = require('../errors');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body', 'headers']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    return next(new ApiError(400, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
