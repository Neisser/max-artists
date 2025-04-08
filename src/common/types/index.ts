import { Hono } from "hono";

import { Database } from "../../infrastructure/db";
import { ArtistsService } from "../../core/artists/artists.service";
import { ReleaseService } from "../../core/releases/release.service";
import { ContentfulStatusCode } from "hono/utils/http-status";

export interface Env {
    DB: D1Database;
}

export interface Variables {
    db: Database;
    artistService: ArtistsService;
    releaseService: ReleaseService;
}

export type AppType = Hono<{
    Bindings: Env;
    Variables: Variables;
}>

export type IError = {
    message: string;
    status: ContentfulStatusCode ;
}

export type IResponse<T> = {
    data?: T | T[] | null;
    error?: IError | null;
}
