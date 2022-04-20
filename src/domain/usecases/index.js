import Profile from './Profile';
import Auth from './Auth';
import Contract from './Contract';
import Job from './Job';
import Admin from './Admin';
import Balance from './Balance';

export default (services) => {
  return {
    ProfileUseCases: Profile(services.ProfileService),
    AuthUseCases: Auth(services.AuthService),
    ContractUseCases: Contract(services.ContractService),
    JobUseCases: Job(services.JobService, services.ProfileService),
    AdminUseCases: Admin(services.AdminService),
    BalanceUseCases: Balance(services.JobService, services.ProfileService),
  };
};