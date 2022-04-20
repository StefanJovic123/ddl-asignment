import HttpServer from '@infrastructure/httpServer';
import Orm from '@infrastructure/orm';
import { errorCustomMiddleware } from '@infrastructure/errorHandling';
import routeInfo from '@infrastructure/logger/routeInfo';
import constructRepositories from '@domain/repositories';
import constructServices from '@domain/services';
import constructUseCases from '@domain/usecases';
import constructApplicationLayer from '@application';

import config from '@common/config/env';
import { responseBuilderMiddleware } from '@infrastructure/responseBuilder';

/**
 * Construct server instance and run it.
 */
const constructAndRunServer = async () => {
  try {
    // init ORM
    const { [config.General.DB_TYPE]: { models, connection } } = await Orm.Sequelize(config);

    // construct domain logic
    const repositories = constructRepositories(models, connection);
    const services = constructServices(repositories);
    const useCases = constructUseCases(services);

    // construct application layer
    const application = constructApplicationLayer(useCases);

    // they are split by position, but order matters within subset
    const middlewares = [
      routeInfo,
      responseBuilderMiddleware,
      errorCustomMiddleware,
    ];

    // init HTTP server
    const serverConfig = {
      port: config.General.PORT,
      baseUrl: '/api/v1/',
      routes: application.restEndpoints,
      middlewares
    };

    HttpServer(serverConfig);
  } catch (err) {
    // This should catch only fatal, server initialization and other tools and development errors.
    // Business logic errors should go to error handling, sentry and custom, middlewares.
    // TIP: Do that by forwarding the error down the middleware chain with next, ex. next(error)
    console.error('FatalError:', err);
  }
};

constructAndRunServer();
