class GetAllUnpaid {
  constructor(jobService) {
    this.jobService = jobService;
  }

  async execute(profile) {
    const { type: profileType, id } = profile;
    return this.jobService.dbConnection.transaction(async (t) => {
      return this.jobService.getAllUnpaid(id, profileType, { transaction: t })
    })
  }
}

export default GetAllUnpaid;
