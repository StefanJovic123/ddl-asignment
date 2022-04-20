import {
  bulkParseModel,
  bulkSanitize,
} from '@common/dataMappers';
import { CONTRACT_STATUS } from '@common/consts';
import { Op as SequelizeOp } from '@infrastructure/orm/sequelize/SequelizeModel';

import Repository from '../Repository';

export default class ContractRepository extends Repository {
  async findAllByContractor(profileId, includeTerminated = false) {
    const includeTerminatedQuery = !includeTerminated ? {
      status: {
        [SequelizeOp.not]: CONTRACT_STATUS.terminated
      }
    } : {};

    const instances = await this.findAll({
      ContractorId: profileId,
      ...includeTerminatedQuery
    });

    const toDomain = bulkParseModel(instances);
    return bulkSanitize(toDomain, this.schemes.read.defaultFields);
  }

  async findAllByClient(profileId, includeTerminated = false) {
    const includeTerminatedQuery = !includeTerminated ? {
      status: {
        [SequelizeOp.not]: CONTRACT_STATUS.terminated
      }
    } : {};

    const instances = await this.model.getAll({
      ClientId: profileId,
      ...includeTerminatedQuery
    });

    const toDomain = bulkParseModel(instances);
    return bulkSanitize(toDomain, this.schemes.read.defaultFields);
  }
}
