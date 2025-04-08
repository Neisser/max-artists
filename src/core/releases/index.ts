import { IdGenerator } from "../../common/utils/id-generator";
import { ArtistRepository } from "../artists/artists.repository";
import { ReleaseRepository } from "./release.repository";
import { ReleaseService } from "./release.service";


export const buildReleaseService = (db: any) => {
    const idGenerator = new IdGenerator('release');

    const releaseRepository = new ReleaseRepository(db, idGenerator);
    
    const artistRepository = new ArtistRepository(db, idGenerator);
    
    const releaseService = new ReleaseService(releaseRepository, artistRepository);

    return releaseService;
}
