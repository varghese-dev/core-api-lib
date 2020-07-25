import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";
import { LOG_LEVEL } from "../common/logger";
import { loggerService } from "..";

export const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.statusCode || error.message.includes('authorization token') ? 401 : 500;
    const message =
        error.message || "It's not you. It's us. We are having some problems.";
    loggerService.log(LOG_LEVEL.error, `${error.statusCode}: ${error.message}`);
    response.status(status).send(message);
};