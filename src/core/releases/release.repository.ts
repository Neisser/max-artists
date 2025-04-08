import { D1Database } from '@cloudflare/workers-types';

import { IRelease } from "./release.entity";
import { IReleaseFilters, IReleaseRepository } from "./release.interfaces";
import { IdGenerator } from '../../common/utils/id-generator';
import { QueryBuilder } from '../../common/utils/query-builder';

export class ReleaseRepository implements IReleaseRepository {
    constructor(private readonly db: D1Database, private readonly idGenerator: IdGenerator) {}
    
    async findAll(filters: IReleaseFilters): Promise<Partial<IRelease>[]> {

        console.log('filters', filters);

        const { query, values } = new QueryBuilder('releases')
            .select(['id', 'title', 'status', 'artist_id'])
            .where('artist_id = ?', filters.artist_id)
            .and('LOWER(genre) = LOWER(?)', filters.genre)
            .and('LOWER(status) = LOWER(?)', filters.status)
            .build();

        const result = await this.db.prepare(query).bind(...values).all();

        return result.results as Partial<IRelease>[];
    }

    async create(release: IRelease): Promise<IRelease> {
        release.id = this.idGenerator.generateId();

        const { query, values } = new QueryBuilder('releases')
            .insert({
                id: release.id,
                title: release.title,
                release_date: release.release_date,
                status: release.status,
                genre: release.genre,
                artist_id: release.artist_id
            })
            .build();

        await this.db.prepare(query).bind(...values).run();

        return release;
    }
}
