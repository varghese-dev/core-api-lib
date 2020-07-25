import { LoggerService } from "./service/logger.service";
import { Auth } from "./utils/auth.util";

export function test() {
    return 'Core Auth Lib Test';
}

export const loggerService = new LoggerService();
export default Auth;