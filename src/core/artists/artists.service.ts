import { IResponse } from "../../common/types";
import { newError } from "../../common/utils/error-generator";
import { IArtist } from "./artists.entity";
import { IArtistRepository, IArtistFilters } from "./artists.interfaces";

export class ArtistsService {
    constructor(private readonly artistRepository: IArtistRepository) {}
    
    async findAll(filters: IArtistFilters): Promise<IResponse<Partial<IArtist>[]>> {
        const data = await this.artistRepository.findAll(filters);

        if (!data) return { error: newError('Artist not found', 404) };

        return { data };
    }

    async create(artist: Partial<IArtist>): Promise<IResponse<IArtist>> {
        
        const data = await this.artistRepository.create(artist);

        if (!data) return { error: newError('Artist not created', 400) };

        return { data };
    }
}
