import { createLogger, format, transports } from 'winston';
const { combine, timestamp, prettyPrint } = format;

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
        new transports.Console()
    ],
    exitOnError: false,
});

export default logger;
