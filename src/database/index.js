const mongoose = require('mongoose');
const logger = require('../logger');

const connectDB = async () => {
    try {
        const user = process.env.DB_USER;
        const password = process.env.DB_PASSWORD;
        const host = process.env.DB_HOST;
        const port = process.env.DB_PORT;
        const dbName = process.env.DB_NAME;
        const replicaSet = process.env.DB_REPLICA_SET;

        const connectionString = `mongodb://${user}:${password}@${host}:${port}/${dbName}?replicaSet=${replicaSet}`;
        await mongoose.connect(connectionString, {
            serverSelectionTImeoutMS: 5000
        });
        logger.info("Connected to MongoDB Database");
    } catch (e) {
        logger.error(e);
    }
};

module.exports = connectDB;
