import { Hono } from 'hono';
import { AppType } from '../../common/types';


const artistsRouter: AppType = new Hono();

artistsRouter.get('/', async (c) => {
    const genre = c.req.query('genre');

    const { data, error } = await c.var.artistService.findAll({ genre });

    if (error) return c.json({ error }, error.status);

    return c.json({ data });
});

artistsRouter.post('/', async (c) => {
    const newArtist = await c.req.json();

    const {data, error} = await c.var.artistService.create({
        name: newArtist.name,
        bio: newArtist.bio,
        genre: newArtist.genre
    });

    if (error) return c.json({ error }, error.status);

    return c.json({ data });
});



export default artistsRouter;
