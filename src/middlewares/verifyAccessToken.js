const jwt = require('jsonwebtoken');
const errors = require('../errors');
const logger = require('../logger');
const { catchAsync } = require('../utils');

const verifyAccessToken = catchAsync(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new errors.ApiError(401, 'Unauthorized');
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (e) {
        throw new errors.ApiError(401, 'Unauthorized');
    }
});

module.exports = verifyAccessToken;
