const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const models = require('../models');
const errors = require('../errors');
const logger = require('../logger');

const createUser = async (username, password, session) => {
    const userDoc = await models.User({
        username,
        password: await argon2.hash(password)
    });
    
    const refreshTokenDoc = await models.RefreshToken({
        owner: userDoc.id
    });

    await userDoc.save({ session });
    await refreshTokenDoc.save({ session });

    const refreshToken = await createRefreshToken(userDoc.id, refreshTokenDoc.id);
    const accessToken = await creatAccessToken(userDoc.id);

    return { 
        id: userDoc.id, 
        refreshToken, 
        accessToken 
    };
};

const login = async (username, password, session) => {
    const userDoc = await models.User.findOne({ username }).select('+password').exec();
    if (!userDoc) {
        throw new errors.ApiError(401, 'Invalid Username or Password');
    }
    
    await verifyPassword (userDoc.password, password);
    
    const refreshTokenDoc = await models.RefreshToken({
        owner: userDoc.id
    });

    await refreshTokenDoc.save({ session });
    
    const refreshToken = await createRefreshToken(userDoc.id, refreshTokenDoc.id);
    const accessToken = await creatAccessToken(userDoc.id);

    return { 
        id: userDoc.id, 
        refreshToken, 
        accessToken
    };
};

const newRefreshToken = async (refreshToken, session) => {
    const currentRefreshToken = await validateRefreshToken(refreshToken);
    
    const newRefreshTokenDoc = await models.RefreshToken({
        owner: currentRefreshToken.userId
    });

    await newRefreshTokenDoc.save({ session });
    await models.RefreshToken.deleteOne({ _id: currentRefreshToken.tokenId }, { session });
    
    const newRefreshToken = await createRefreshToken(currentRefreshToken.userId, newRefreshTokenDoc.id);
    const newAccessToken = await creatAccessToken(currentRefreshToken.userId);

    return { 
        id: currentRefreshToken.userId,
        refreshToken: newRefreshToken, 
        accessToken: newAccessToken
    };
};

const newAccessToken = async (refreshToken) => {
    const decodedRefreshToken = await validateRefreshToken(refreshToken);
    const newAccessToken = await creatAccessToken(decodedRefreshToken.userId);
    
    return {
        id: decodedRefreshToken.userId,
        refreshToken,
        accessToken: newAccessToken
    };
};

const logout = async (refreshToken, session) => {
    const decodedRefreshToken = await validateRefreshToken(refreshToken);
    await models.RefreshToken.deleteOne({ _id: decodedRefreshToken.tokenId }, { session });    
    return { success: true, message: 'Logged out successfully' };
};

const logoutAll = async (refreshToken, session) => {
    const decodedRefreshToken = await validateRefreshToken(refreshToken);
    await models.RefreshToken.deleteMany({ owner: decodedRefreshToken.userId }, { session });    
    return { success: true, message: 'Logged out from all devices successfully' };
};

const creatAccessToken = async (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};

const createRefreshToken = async (userId, tokenId) => {
    return jwt.sign({ userId, tokenId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });;
};

const verifyPassword = async (hashedPassword, rawPassword) => {
    if (await argon2.verify(hashedPassword, rawPassword)) {
        // password matches
    } else {
        throw new errors.ApiError(401, 'Invalid Username or Password');
    }
};

const validateRefreshToken = async (token) => {
    const decodeToken = async () => {
        try {
            return await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch(e) {
            throw new errors.ApiError(401, 'Invalid Token');
        }
    }

    const decodedToken = await decodeToken();
    const tokenExists = await models.RefreshToken.findOne({ _id: decodedToken.tokenId });
    if (tokenExists) {
        return decodedToken;
    } else {
        throw new errors.ApiError(401, 'Expired Token');
    }
};

module.exports = {
    createUser,
    login,
    newRefreshToken,
    newAccessToken,
    logout,
    logoutAll,
    creatAccessToken,
    createRefreshToken,
    verifyPassword,
    validateRefreshToken
};
