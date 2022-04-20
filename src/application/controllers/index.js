import config from '@common/config/env';
import { toUpper } from '@common/dataMappers';

// controllers
import contracts from './contracts';
import jobs from './jobs';
import admin from './admin';
import balance from './balances';

const controllerCreators = [
  contracts,
  jobs,
  admin,
  balance,
];

/**
 * Filter controllers by environments
 * @param {Controller[]} controllers Available controllers
 */
export const filterByEnvironment = (controllers = [], currEnvironment = '') =>
  controllers.filter((controller) => {
    // if there is no environment defined it shall not pass.
    if (!controller.environments) {
      return false;
    }

    const availableEnvironments = controller.environments;

    // if there is only one available and it is defined as a string
    if (toUpper(availableEnvironments) === toUpper(currEnvironment)) {
      return true;
    }

    // if it is defined as array of strings
    return availableEnvironments.find((env) => toUpper(env) === toUpper(currEnvironment));
  });

/**
 * Create controllers by injecting use cases.
 * @param {UseCase[]} useCases Available use cases.
 * @param middlewares
 * @param infrastructure
 */
const controllersFactory = (useCases, middlewares, infrastructure) => {
  try {
    // create actual controllers
    const controllers = controllerCreators.reduce((acc, controllerCreator) => {
      const partial = controllerCreator(useCases, middlewares, infrastructure);

      return [...acc, ...partial];
    }, []);

    // filter controllers by environment that it is available in
    return filterByEnvironment(controllers, config.General.ENVIRONMENT);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    throw error;
  }
};

export default controllersFactory;