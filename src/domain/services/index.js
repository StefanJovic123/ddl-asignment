import ProfileService from './ProfileService';
import AuthService from './AuthService';
import ContractService from './ContractService';
import JobService from './JobService';
import AdminService from './AdminService';

export default (repositories) => {
  return {
    ProfileService: new ProfileService(repositories.ProfileRepository),
    ContractService: new ContractService(repositories.ContractRepository),
    AuthService: AuthService(repositories),
    JobService: new JobService(repositories.JobRepository),
    AdminService: new AdminService(repositories.ProfileRepository)
  };
};
