import { modelClasses } from '@infrastructure/orm/sequelize/models'

class GetById {
  constructor(jobService) {
    this.jobService = jobService;
  }

  async execute(id, includeAllRelationships = false) {
    return this.jobService.getById(
      id,
      includeAllRelationships ? {
        include: [{
          model: modelClasses.Contract,
          as: 'contract',
          include: [{
            model: modelClasses.Profile,
            as: 'client',
          }]
        }]
      } : {}
    )
  }
}

export default GetById;
