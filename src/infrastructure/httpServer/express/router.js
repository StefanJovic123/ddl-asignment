import { stripStartingSlash, filter, isFunction } from '@common/utils';

/**
 * Register routes to passed Express HttpServer.
 * @param {string} baseUrl URI prefix.
 * @param {*} server Server to register routes to.
 * @param {Route[]} routes Available routes.
 */
const registerRoutes = (server, baseUrl, routes) =>
  routes.forEach((route, index) => {
    if (!route.method) {
      throw new Error(`Undefined HTTP method, index: ${index}`);
    }

    if (!route.path) {
      throw new Error(`Undefined HTTP path, index: ${index}`);
    }

    // route handler can only be undefined if there are some interceptors defined
    if (!route.handler && (!route.interceptors || route.interceptors.length === 0)) {
      throw new Error(`Undefined HTTP handler, index: ${index}`);
    }

    const registerResponseTransformerFns = (transformers) => (_req, res, next) => {
      res.transformerFns = filter(transformers, (fn) => isFunction(fn));
      next();
    };

    if (route.handler) {
      server[route.method.toLowerCase()](
        `${route.baseUrl || baseUrl}${stripStartingSlash(route.path.toLowerCase())}`,
        registerResponseTransformerFns(route.resTransformFns || []),
        ...route.middlewares.filter((e) => e),
        route.handler,
      );
    }
  });

export default registerRoutes;
