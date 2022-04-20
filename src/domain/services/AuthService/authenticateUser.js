import AuthenticationError from '@common/errors/AuthenticationError';

const authenticateUserFactory = (profileRepository) => async (profileId) => {
  const profile = await profileRepository.findById(profileId);

  if (!profile) {
    throw new AuthenticationError('Invalid ProfileID');
  }

  return profile;
};

export default authenticateUserFactory;
