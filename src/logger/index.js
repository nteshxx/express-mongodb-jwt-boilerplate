const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'req,res,responseTime,hostname',
      // messageFormat: '{req.method} | url: {req.url} | {res.statusCode} | {responseTime} ms',
    },
  },
});

module.exports = logger;
