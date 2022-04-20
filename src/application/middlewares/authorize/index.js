import AuthorizationError from '@common/errors/AuthorizationError';
import AuthenticationError from '@common/errors/AuthenticationError';

/**
 * This middleware checks if user is authorized to access route based on profiles.type field
 * @param {string[]} allowedProfileTypes
 */
const authorizationFactory = (allowedProfileTypes = []) => async (req, _res, next) => {
  try {
    if (!req.profile) {
      throw new AuthenticationError();
    }

    if (allowedProfileTypes.includes(req.profile.type)) {
      next();
    } else {
      throw new AuthorizationError();
    }
  } catch (error) {
    // pass it to the error handler
    next(error);
  }
};

export default authorizationFactory;