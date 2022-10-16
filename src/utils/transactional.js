const mongoose = require("mongoose");

const transactional = (fn) => {
    return async (req, res, next) => {
        let result;
        await mongoose.connection.transaction(async (session) => {
            result = await fn(req, res, session);
            return result;
        });

        return result;
    }
};

module.exports = transactional;
