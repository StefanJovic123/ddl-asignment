import loggingMiddlewaresFactories from './logging';
import authenticateFactory from './authentication';
import authorizeFactory from './authorize';

const middlewareFactory = ({ AuthUseCases }) => {
  return {
    Authenticate: authenticateFactory(AuthUseCases),
    Authorize: authorizeFactory,
    Log: loggingMiddlewaresFactories,
  };
};

export default middlewareFactory;