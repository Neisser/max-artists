import { IResponse } from "../../common/types";
import { newError } from "../../common/utils/error-generator";
import { DateValidator } from "../../common/validators";
import { IArtistRepository } from "../artists/artists.interfaces";
import { IRelease } from "./release.entity";
import { IReleaseFilters, IReleaseRepository } from "./release.interfaces";

export class ReleaseService {
    constructor(
        private readonly releaseRepository: IReleaseRepository,
        private readonly artistRepository: IArtistRepository
    ) {}
    
    async findAll(filters: IReleaseFilters): Promise<IResponse<Partial<IRelease>[]>> {
        const data = await this.releaseRepository.findAll(filters);

        if (!data) return { error: newError('Release not found', 404) };

        return { data };
    }

    async create(release: Partial<IRelease>): Promise<IResponse<IRelease>> {
        if (!release.artist_id) return { error: newError('Artist ID is required', 400) }
        
        if (release.release_date && !DateValidator.validate(release.release_date)) return { error: newError('Release date is invalid', 400) }

        const artistExists = await this.artistRepository.exist(release.artist_id);

        if (!artistExists) return { error: newError('Artist not found', 404) }

        const newRelease = await this.releaseRepository.create(release);

        return {data: newRelease};
    }
}
