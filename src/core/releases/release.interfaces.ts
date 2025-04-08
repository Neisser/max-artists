import { IRelease } from "./release.entity";

export interface IReleaseRepository {
    findAll(filters: {
        artist_id?: string
        genre?: string
        status?: string
    }): Promise<Partial<IRelease>[]>

    create(release: Partial<IRelease>): Promise<IRelease>
}

export interface IReleaseFilters {
    artist_id?: string
    genre?: string
    status?: string
}