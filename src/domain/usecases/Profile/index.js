import GetById from './GetById';

export default (UsersService) => ({
  GetById: new GetById(UsersService),
});
