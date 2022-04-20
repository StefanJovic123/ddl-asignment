import BadRequest from '@common/errors/BadRequest';
import { PROFILE_TYPES, MAX_DEPOSIT_PERCENT } from '@common/consts';

class CreateDeposit {
  constructor(jobService, profileService) {
    this.jobService = jobService;
    this.profileService = profileService;
  }

  async execute(clientId, amount) {
    await this.jobService.dbConnection.transaction(async (t) => {

      const allUnpaidJobs = await this.jobService.getAllUnpaid(clientId, PROFILE_TYPES.client, { transaction: t, lock: true });

      let totalUnpaidAmount = 0;
      allUnpaidJobs.forEach(item => { totalUnpaidAmount += item.price });

      
      // pitfall is that if there are no unpaid jobs deposit is not possible...
      // reqs are not mentioning this use case, so it is assumed that deposit is not possible in that case!
      const maxAmountToDeposit = (MAX_DEPOSIT_PERCENT / 100) * totalUnpaidAmount
      if (amount > maxAmountToDeposit) {
        throw new BadRequest(`Deposit above ${maxAmountToDeposit} can not be made.`);
      }

      const clientForDepositing = await this.profileService.getById(clientId, { transaction: t, lock: true });
      
      // Update balance of Client
      await this.profileService.update(
        { balance: clientForDepositing.balance + amount },
        { id: clientForDepositing.id },
        { transaction: t, lock: true }
      );
   
    });
  }
}

export default CreateDeposit;
