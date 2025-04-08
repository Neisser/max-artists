import { MiddlewareHandler } from "hono";

import { Variables } from "../../common/types";
import { buildArtistService } from "../../core/artists";
import { buildReleaseService } from "../../core/releases";

export const serviceInjector: MiddlewareHandler<{
    Bindings: Env;
    Variables: Variables;
}> = async (c, next) => {
    const database = c.var.db.db;

    const artistService = buildArtistService(database);
    const releaseService = buildReleaseService(database);

    c.set("artistService", artistService);
    c.set("releaseService", releaseService);
    
    await next();
}