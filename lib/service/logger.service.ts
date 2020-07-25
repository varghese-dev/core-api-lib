import logger, { LOG_LEVEL }  from "../common/logger";

export class LoggerService {
    private logger = logger;

    log(level: LOG_LEVEL, message: string) {
        this.logger.log({
            level: level,
            message: `users-ms ::: ${message}`
        });
    }
}