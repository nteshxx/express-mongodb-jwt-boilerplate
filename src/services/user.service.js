const models = require('../models');
const errors = require('../errors');

const getMe = async (userId) => {
    const userDoc = await models.User.findById(userId).exec();
    if (!userDoc) {
        throw new errors.ApiError(404, 'User Not Found');
    }
    return userDoc;
};

module.exports = {
    getMe,
};
