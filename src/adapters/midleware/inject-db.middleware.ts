import { MiddlewareHandler } from "hono";
import { Variables } from "../../common/types";
import { DatabaseService } from "../../infrastructure/db";

export const databaseInjector: MiddlewareHandler<{
    Bindings: Env;
    Variables: Variables;
}> = async (c, next) => {
    const database = await DatabaseService.create(c.env.DB);
    
    c.set("db", database);

    await next();
}