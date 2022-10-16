const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');
const router = express.Router();

router.get('/me', middlewares.verifyAccessToken, controllers.user.me);

module.exports = router;
