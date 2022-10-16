const authService = require('./auth.service');
const userService = require('./user.service');

module.exports = {
    auth: authService,
    users: userService,
};
