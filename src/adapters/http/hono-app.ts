import { Hono } from 'hono';

import { AppType } from '../../common/types';

import { logger } from '../midleware/logger.middleware';
import { errorHandler } from '../midleware/error-handler.middleware';
import { databaseInjector } from '../midleware/inject-db.middleware';
import { serviceInjector } from '../midleware/service-injector.middleware';

import artistsRouter from '../routes/artists';
import releasesRouter from '../routes/releases';


const app: AppType = new Hono();

// Global Middleware
app.use('*', logger);
app.use('*', errorHandler);
app.use('*', databaseInjector);
app.use('*', serviceInjector);

// Routes 
app.route('/artists', artistsRouter);
app.route('/releases', releasesRouter)

export default app;
