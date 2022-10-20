const express = require('express');
const controllers = require('../controllers');
const validations = require('../validations');
const { validate } = require('../middlewares');
const router = express.Router();

router.post('/signup', validate(validations.auth.signup), controllers.auth.signup);
router.post('/login', validate(validations.auth.login), controllers.auth.login);
router.post('/logout', validate(validations.auth.refreshToken), controllers.auth.logout);
router.post('/logout-all', validate(validations.auth.refreshToken), controllers.auth.logoutAll);
router.post('/access-token', validate(validations.auth.refreshToken), controllers.auth.newAccessToken);
router.post('/refresh-token', validate(validations.auth.refreshToken), controllers.auth.newRefreshToken);

module.exports = router;
