import Repository from '../Repository';
import { modelClasses } from '@infrastructure/orm/sequelize/models';
import { PROFILE_TYPES, CONTRACT_STATUS } from '@common/consts';

export default class JobRepository extends Repository {
  async findAllUnpaid(profileId, profileType, options) {

    let profileQuery = { ContractorId: profileId };
    if (profileType === PROFILE_TYPES.client) {
      profileQuery = { ClientId: profileId }
    }

    return this.findAll({ paid: null }, {
      ...options,
      include: [{
        model: modelClasses.Contract,
        as: 'contract',
        where: { status: CONTRACT_STATUS.inProgress, ...profileQuery }
      }]
    })
  }
}
