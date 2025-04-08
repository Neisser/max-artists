import { MiddlewareHandler } from "hono";
import { Variables } from "../../common/types";

export const errorHandler: MiddlewareHandler<{
    Bindings: Env;
    Variables: Variables;
}> = async (c, next) => {
    try {
        await next();
    } catch (error) {
        console.error(error);
        
        return c.json({
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : "Unknown error"
        }, 500);
    }
}