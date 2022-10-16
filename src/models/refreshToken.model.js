const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;

const refreshTokenSchema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
});

const RefreshToken = model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;
