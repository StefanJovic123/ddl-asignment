import { PROFILE_TYPES } from '@common/consts';

class GetById {
  constructor(ContractService) {
    this.contractService = ContractService;
  }

  async execute(id, profile) {
    const { type: profileType, id: profileId } = profile;
    return this.contractService.getOne(
      { 
        id,
        deletedAt: null,
        [profileType === PROFILE_TYPES.client ? 'ContractorId' : 'ClientId']: profileId
      }
    );
  }
}

export default GetById;
