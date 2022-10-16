const services = require('../services');
const { catchAsync, transactional } = require('../utils');

const signup = catchAsync(transactional(async (req, res, session) => {
    const response = await services.auth.createUser(req.body.username, req.body.password, session);
    return response;
}));

const login = catchAsync(transactional(async (req, res, session) => {
    const response = await services.auth.login(req.body.username, req.body.password, session);
    return response;
}));

const newRefreshToken = catchAsync(transactional(async (req, res, session) => {
    const response = await services.auth.newRefreshToken(req.body.refreshToken, session);
    return response;
}));

const newAccessToken = catchAsync(async (req, res) => {
    const response = await services.auth.newAccessToken(req.body.refreshToken);
    return response;
});

const logout = catchAsync(transactional(async (req, res, session) => {
    const response = await services.auth.logout(req.body.refreshToken, session);
    return response;
}));

const logoutAll = catchAsync(transactional(async (req, res, session) => {
    const response = await services.auth.logoutAll(req.body.refreshToken, session);
    return response;
}));

module.exports = {
    signup,
    login,
    newRefreshToken,
    newAccessToken,
    logout,
    logoutAll,
};
