import AuthenticationError from '@common/errors/AuthenticationError';

export default class Authenticate {
  constructor(authService) {
    this.authService = authService;
  }

  async execute(id) {
    if (id) {
      return this.authService.authenticateUser(id);
    }

    throw new AuthenticationError();
  }
}
