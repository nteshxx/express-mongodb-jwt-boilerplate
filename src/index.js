const express = require('express');
const pinoHTTP = require('pino-http');
const logger = require('./logger');
const errors = require('./errors');
const routes = require('./routes');
const connectDB = require('./database');
const app = express();
const port = process.env.PORT;

const startServer = async () => {
  await connectDB();

  app.use(pinoHTTP({ logger }));
  app.use(express.json());
  app.use('/api', routes);

  app.use((req, res, next) => {
    next(new errors.ApiError(404, 'Not found'));
  });

  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res
      .status(err.statusCode || 500)
      .send({ status: err.statusCode || 500, error: err.message });
  });

  app.listen(port, () => {
    logger.info(`Server listening at http://localhost:${port}`);
  });
};

module.exports = startServer;
