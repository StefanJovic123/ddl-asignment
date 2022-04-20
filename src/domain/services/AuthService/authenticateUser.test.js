import authenticateUserFactory from './authenticateUser';

const profiles = [
  {
    id: 124,
  },
  {
    id: 5866,
  },
  {
    id: 32
  },
];

describe('authenticateUser', () => {
  const ProfileRepository = {
    findById: async (id) => profiles.find((u) => u.id === id),
  };

  const authenticateUser = authenticateUserFactory(ProfileRepository);

  describe('Given id matching valid profile', () => {
    const profileId = 32;

    it('should return object with id', async () => {
      const { id } = await authenticateUser(profileId);

      expect(id).toBe(profileId);
    });
  });

  describe('Given id not matching any profile', () => {
    const id = 10000;

    it('should throw AuthenticationError', async () => {
      expect.assertions(3);
      try {
        await authenticateUser(id);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.code).toBe(401);
        expect(error.message).toBe('Invalid ProfileID');
      }
    });
  });
});