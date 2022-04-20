import GetBestClients from './GetBestClients';
import GetBestProfession from './GetBestProfession';

export default (AdminService) => ({
  GetBestClients: new GetBestClients(AdminService),
  GetBestProfession: new GetBestProfession(AdminService),
});
