import { ArtistsService } from "./artists.service";
import { ArtistRepository } from "./artists.repository";
import { IdGenerator } from "../../common/utils/id-generator";

export const buildArtistService = (db: any) => {
    const idGenerator = new IdGenerator('artist');
    const artistRepository = new ArtistRepository(db, idGenerator);
    const artistService = new ArtistsService(artistRepository);
    return artistService;
}
