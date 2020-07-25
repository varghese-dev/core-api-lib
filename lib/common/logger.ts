import { createLogger, format, transports, level } from 'winston';
const { label, combine, timestamp, prettyPrint } = format;

export enum LOG_LEVEL {
    error = 'error',
    warn = 'warn',
    info = 'info',
    http = 'http',
    verbose = 'verbose',
    debug = 'debug',
    silly = 'silly'
};

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        prettyPrint(),
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: './error.log', level: 'error' }),
        new transports.File({ filename: './commonLog.log' }),
    ],
    exitOnError: false,
});

export default logger;
