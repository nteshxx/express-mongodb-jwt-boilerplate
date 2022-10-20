const Joi = require('joi');

const signup = {
  body: Joi.object()
    .keys({
      username: Joi.string()
        .regex(/^[A-Za-z0-9 ,.']{3,20}$/)
        .required(),
      password: Joi.string().min(8).max(25).required(),
    })
    .min(2)
    .max(2),
};

const login = {
  body: Joi.object()
    .keys({
      username: Joi.string()
        .regex(/^[A-Za-z0-9 ,.']{3,20}$/)
        .required(),
      password: Joi.string().min(8).max(25).required(),
    })
    .min(2)
    .max(2),
};

const refreshToken = {
  body: Joi.object()
    .keys({
      refreshToken: Joi.string().required(),
    })
    .min(1)
    .max(1),
};

module.exports = {
  signup,
  login,
  refreshToken,
};
