import { MiddlewareHandler } from "hono";
import { Variables } from "../../common/types";

export const logger: MiddlewareHandler<{
    Bindings: Env;
    Variables: Variables;
}> = async (c, next) => {
    const startTime = Date.now();
    
    const { method, url } = c.req;

    await next();

    const responseTime = Date.now() - startTime;

    console.log(`${method} ${url} ${responseTime}ms`);
}
