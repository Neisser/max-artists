
import { D1Database } from "@cloudflare/workers-types";

export interface Database {
    db: D1Database;
}

export class DatabaseService implements Database {
    constructor(public readonly db: D1Database) {}

    static async create(db: D1Database) {
        return new DatabaseService(db);
    }
}
