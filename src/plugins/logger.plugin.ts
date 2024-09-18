import { createLogger, format, transports } from 'winston';
const { combine, json, timestamp } = format;

const createdLogger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export function buildLogger(service: string) {
  return {
    log: (message: string) => {
      createdLogger.log('info', { message, service });
    },
  };
}

createdLogger.add(
  new transports.Console({
    format: format.simple(),
  }),
);
