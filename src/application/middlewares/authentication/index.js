import AuthenticationError from '@common/errors/AuthenticationError';


const extractHeader = (headers = {}, name) => {
  if (!headers[name]) {
    return null;
  }

  return headers[name];
};

/**
 * This middleware adds authenticated user to req object
 *
 *
 * Format of user object:
 *    {id: int} - id represents id of logged in user
 */
export const authenticateFactory = ({ Authenticate }) => async (req, _res, next) => {
  try {
   const profileId = parseInt(extractHeader(req.headers, 'profile_id'));
    
    if (profileId) {
      req.profile = await Authenticate.execute(profileId);
    }

    if (req.profile) {
      next();
    } else {
      throw new AuthenticationError();
    }
  } catch (error) {
    // pass it to the error handler
    next(error);
  }
};

export default authenticateFactory;