import GetAll from './GetAll';
import GetById from './GetById';

export default (ContractService) => ({
  GetAll: new GetAll(ContractService),
  GetById: new GetById(ContractService),
});
