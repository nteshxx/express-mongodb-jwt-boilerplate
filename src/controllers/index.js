const authController = require('./auth.controller');
const userController = require('./user.controller');

module.exports = {
    auth: authController,
    user: userController
};
