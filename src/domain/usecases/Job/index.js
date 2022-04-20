import GetAllUnpaid from './GetAllUnpaid';
import GetById from './GetById';
import CreatePayment from './CreatePayment';

export default (JobService, ProfileService) => ({
  GetAllUnpaid: new GetAllUnpaid(JobService),
  GetById: new GetById(JobService),
  CreatePayment: new CreatePayment(JobService, ProfileService),
});
