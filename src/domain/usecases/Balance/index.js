import CreateDeposit from './CreateDeposit';

export default (JobService, ProfileService) => ({
  CreateDeposit: new CreateDeposit(JobService, ProfileService),
});
