import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as fs from 'fs';

export interface IAuthConfig {
    PRIVATE_KEY_PATH: string;
    PUBLIC_KEY_PATH: string;
    WHITELISTED_URLS: string[];
    privateKey?: any;
    publicKey?: any;
}

let authConfig: IAuthConfig | undefined = undefined;

export const init = (config: IAuthConfig) => {
    authConfig = config;
    // use 'utf8' to get string instead of byte array  (512 bit key)
    authConfig.privateKey = fs.readFileSync(authConfig.PRIVATE_KEY_PATH, 'utf8');
    authConfig.publicKey = fs.readFileSync(authConfig.PUBLIC_KEY_PATH, 'utf8')
}

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    if (!authConfig) {
        res.status(401).send(`NOT_AUTHORIZED`);
    }
    if (!authConfig?.WHITELISTED_URLS.includes(req.url)) {
        //Try to validate the token and get data
        try {
            //Get the jwt token from the head
            let token = <string>req.headers["authorization"];
            token = token.split(' ')[1];
            let jwtPayload;
            jwtPayload = <any>jwt.verify(token, authConfig?.privateKey);
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            //If token is not valid, respond with 401 (unauthorized)
            res.status(401).send(`NOT_AUTHORIZED`);
            return;
        }
    }

    //Call the next middleware or controller
    next();
};

export const generateJwt = (payload: Object) => {
    if (!authConfig) {
        return 'No auth config found';
    }
    let jwtPayload = payload;

    //The token is valid for 1 hour
    //We want to send a new token on every request
    return jwt.sign(jwtPayload, authConfig?.privateKey, {
        expiresIn: "1h"
    });
};