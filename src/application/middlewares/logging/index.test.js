import * as logging from './index';

describe('createLogRequestMiddlewareFactory', () => {
  const createLogRequestMiddlewareQueryFactory = logging.createLogRequestMiddlewareFactory('query');
  const createLogRequestMiddlewareBodyFactory = logging.createLogRequestMiddlewareFactory('body');
  const createLogRequestMiddlewareParamsFactory = logging.createLogRequestMiddlewareFactory(
    'params',
  );
  const LogUseCase = { execute: jest.fn() };
  const createLogRequestMiddlewareQuery = createLogRequestMiddlewareQueryFactory(
    { Log: LogUseCase },
    'user',
  );
  const createLogRequestMiddlewareBody = createLogRequestMiddlewareBodyFactory(
    { Log: LogUseCase },
    'user',
  );
  const createLogRequestMiddlewareParams = createLogRequestMiddlewareParamsFactory(
    { Log: LogUseCase },
    'user',
  );

  it('should catch an error and continue flow', async () => {
    const nextQuery = jest.fn();
    const nextBody = jest.fn();
    const nextParams = jest.fn();

    await createLogRequestMiddlewareQuery(null, null, nextQuery);
    await createLogRequestMiddlewareBody(null, null, nextBody);
    await createLogRequestMiddlewareParams(null, null, nextParams);

    expect(nextQuery).toBeCalledWith();
    expect(nextBody).toBeCalledWith();
    expect(nextParams).toBeCalledWith();
  });

  it('should log and continue flow', async () => {
    const body = { id: 1 };
    const query = { limit: 10 };
    const params = { id: 1 };
    const req = { query, body, params };
    const nextQuery = jest.fn();
    const nextBody = jest.fn();
    const nextParams = jest.fn();

    await createLogRequestMiddlewareQuery(req, null, nextQuery);
    await createLogRequestMiddlewareBody(req, null, nextBody);
    await createLogRequestMiddlewareParams(req, null, nextParams);

    expect(LogUseCase.execute).toBeCalledTimes(3);
    expect(nextQuery).toBeCalledWith();
    expect(nextBody).toBeCalledWith();
    expect(nextParams).toBeCalledWith();
  });
});