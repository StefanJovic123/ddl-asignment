import controllersFactory from './controllers';
import middlewareFactory from './middlewares';

export default (useCases) => ({
  restEndpoints: controllersFactory(
    useCases,
    middlewareFactory(useCases)
  ),
});