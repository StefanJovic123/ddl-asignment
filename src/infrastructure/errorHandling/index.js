
   
import HttpError from '@common/errors/HttpError';
import DomainError from '@common/errors/DomainError';

export const errorCustomHandler = () => (err, _req, res, _next) => {
  if (err instanceof HttpError || err instanceof DomainError) {
    return res.sendError(err, err.code);
  }

  return res.sendError(err);
};
export const errorCustomMiddleware = {
  position: 'post-router',
  handler: errorCustomHandler(),
};
