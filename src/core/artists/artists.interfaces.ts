import { IArtist } from "./artists.entity"; 

export interface IArtistRepository {
    findAll(filters: {
        genre?: string
    }): Promise<Partial<IArtist>[]>

    create(artist: Partial<IArtist>): Promise<IArtist>

    exist(id: string): Promise<boolean>
}

export interface IArtistFilters {
    genre?: string;
    name?: string;
}

