import AuthenticationError from '@common/errors/AuthenticationError';
import authenticateFactory from './index';

const profiles = [
  {
    id: 32
  },
];

describe('Authentication Middleware', () => {
  const Authenticate = {
    execute: (id) => {
      if (id) {
        return profiles.find((u) => u.id === id);
      }

      throw new AuthenticationError();
    },
  };

  const authentication = authenticateFactory({ Authenticate });

  describe('Given request Authorization header', () => {
    const req = { headers: {} };

    it('should call next with AuthenticationError', () => {
      expect.assertions(3);
      const next = (error) => {
        expect(error).toBeDefined();
        expect(error.code).toBe(401);
        expect(error.message).toBe('Not authenticated.');
      };
      authentication(req, {}, next);
    });
  });

  describe('Given request with profile_id matching profile', () => {
    const id = 32;
    const req = { headers: { profile_id: `${id}` } };

    it('should add user with id', async () => {
      await authentication(req, {}, () => ({}));
      expect(req.profile).toBeDefined();
      expect(req.profile.id).toBe(id);
    });

    it('should call next without error', async () => {
      expect.assertions(1);
      const next = (error) => {
        expect(error).toBeUndefined();
      };
      await authentication(req, {}, next);
    });
  });
});