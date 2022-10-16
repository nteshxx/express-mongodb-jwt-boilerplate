const express = require('express');
const controllers = require('../controllers');
const router = express.Router();

router.post('/signup', controllers.auth.signup);
router.post('/login', controllers.auth.login);
router.post('/logout', controllers.auth.logout);
router.post('/logout-all', controllers.auth.logoutAll);
router.post('/access-token', controllers.auth.newAccessToken);
router.post('/refresh-token', controllers.auth.newRefreshToken);

module.exports = router;
