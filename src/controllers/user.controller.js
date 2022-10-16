const jwt = require('jsonwebtoken');
const services = require('../services');
const { catchAsync, transactional } = require('../utils');

const me = catchAsync(async (req, res) => {
    const response = await services.users.getMe(req.userId);
    return response;
});

module.exports = {
    me,
};
