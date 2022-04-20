import { isArray, reduce } from '@common/utils';

export const extractData = (req, accessors) => {
  if (!isArray(accessors)) {
    return null;
  }

  const data = reduce(
    accessors,
    (acc, accessor) => {
      acc[accessor] = req[accessor];
      return acc;
    },
    {},
  );

  return data;
};

export const createLogRequestMiddlewareFactory = (accessor) => (
  { Log },
) => async (req, _res, next) => {
  try {
    const { routeConfig, [accessor]: data } = req;
    await Log.execute(data, {}, routeConfig);
  } catch (loggingError) {
    console.log({ loggingError });
  }
  next();
};

export default {
  recordBody: createLogRequestMiddlewareFactory('body'),
  recordParams: createLogRequestMiddlewareFactory('params'),
  recordQuery: createLogRequestMiddlewareFactory('query'),
};
