import { D1Database } from '@cloudflare/workers-types'; 

import { IArtist } from "./artists.entity";
import { IArtistFilters, IArtistRepository } from "./artists.interfaces";
import { IdGenerator } from '../../common/utils/id-generator';
import { QueryBuilder } from '../../common/utils/query-builder';

export class ArtistRepository implements IArtistRepository {
    constructor(private readonly db: D1Database, private readonly idGenerator: IdGenerator) {}

    async findAll(filters: IArtistFilters): Promise<Partial<IArtist>[]> {
        const { query, values } = new QueryBuilder('artists')
            .select(['id', 'name', 'bio', 'genre'])
            .where('LOWER(genre) = LOWER(?)', filters.genre)
            .where('LOWER(name) = LOWER(?)', filters.name)
            .build();

        const result = await this.db.prepare(query).bind(...values).all();
        return result.results as Partial<IArtist>[];
    }

    async create(artist: IArtist): Promise<IArtist> {
        artist.id = this.idGenerator.generateId();

        const { query, values } = new QueryBuilder('artists')
            .insert({
                id: artist.id,
                name: artist.name,
                bio: artist.bio,
                genre: artist.genre
            })
            .build();

        await this.db.prepare(query).bind(...values).run();    

        return artist;
    }

    async exist(id: string): Promise<boolean> {
        const { query, values } = new QueryBuilder('artists')
            .select(['1'])
            .where('id', id)
            .build();
        
        const result = await this.db.prepare(query).bind(...values).first<{ 1: number }>();
        
        return result !== null;
    }
}
