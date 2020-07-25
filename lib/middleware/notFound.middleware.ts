import { Request, Response, NextFunction } from "express";
import { LOG_LEVEL } from "../common/logger";
import { loggerService } from "..";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  loggerService.log(LOG_LEVEL.error, `Resource "${request.url.toString()}" not found`);
  const message = "Resource not found";
  response.status(404).send(message);
};