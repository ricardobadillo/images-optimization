const winston = require('winston');
const { combine, json, timestamp } = winston.format

const createdLogger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ]
});

module.exports = function buildLogger(service: string) {
  return {
    log: (message: string) => {
      createdLogger.log('info', { message, service });
    },
  }
}

createdLogger.add(new winston.transports.Console({
  format: winston.format.simple(),
}));