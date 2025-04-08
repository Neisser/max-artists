import { Hono } from 'hono';

import { AppType } from '../../common/types';

const releasesRouter: AppType = new Hono();

releasesRouter.get('/', async (c) => {
    const { data, error } = await c.var.releaseService.findAll({
        artist_id: c.req.query('artist_id'),
        genre: c.req.query('genre'),
        status: c.req.query('status')
    });
    
    if (error) return c.json({ error }, error.status);

    return c.json({ data });
});

releasesRouter.post('/', async (c) => {
    const newRelease = await c.req.json();

    const { data, error } = await c.var.releaseService.create({
        title: newRelease.title,
        release_date: newRelease.release_date,
        status: newRelease.status,
        genre: newRelease.genre,
        artist_id: newRelease.artist_id
    });

    if (error) return c.json({ error }, error.status);
    
    return c.json({ data });
});



export default releasesRouter;
