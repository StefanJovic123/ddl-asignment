import { PROFILE_TYPES } from '@common/consts';

class GetAll {
  constructor(ContractService) {
    this.contractService = ContractService;
  }

  async execute(profile) {
    const { type: profileType, id } = profile;

    if (profileType === PROFILE_TYPES.client) {
      return this.contractService.getAllByClient(id);
    }


    return this.contractService.getAllByContractor(id);
  }
}

export default GetAll;
