import BadRequest from '@common/errors/BadRequest';
import { modelClasses } from '@infrastructure/orm/sequelize/models';

class CreatePayment {
  constructor(jobService, profileService) {
    this.jobService = jobService;
    this.profileService = profileService;
  }

  async execute(jobId, payerId, amount) {
    await this.jobService.dbConnection.transaction(async (t) => {

      // Fetch only unpaid job
      // When no Job is found, error ResourceNotFoundError will be thrown
      // This is not ideal, more useful error message should be returned
      const job = await this.jobService.getOne(
        { id: jobId, paid: null },
        {
          include: [{
            model: modelClasses.Contract,
            as: 'contract',
            include: [{
              model: modelClasses.Profile,
              as: 'client',
            },
            {
              model: modelClasses.Profile,
              as: 'contractor',
            }]
          }],
          transaction: t
        }
      );

      

      // If contract, client or client (profile) is not found or not matching to id of user
      // who tries to pay, treat as payment has failed
      if (!job.contract || !job.contract.client || !job.contract.contractor || job.contract.client.id !== payerId || job.price !== amount) {
        throw new BadRequest("Payment creation failed");
      }

      // This is not ideal but to me extra sure that we are checking right balance
      // fetching payer profile is necessary with set active transaction
      // ideally transaction should be applied for all queries
      // and this transaction should be created when request is made to API...
      const payer = await this.profileService.getById(payerId, { transaction: t });

      if (payer.balance - amount < 0) {
        throw new BadRequest("Not Enough funds");
      }

      await this.jobService.update(
        { paid: 1, paymentDate: new Date() },
        { id: jobId },
        { transaction: t }
      );

      // Update ballance of payer
      await this.profileService.update(
        { balance: payer.balance - amount },
        { id: payerId },
        { transaction: t }
      );

      // Update ballance of Contractor
      await this.profileService.update(
        { balance: job.contract.contractor.balance + amount },
        { id: job.contract.contractor.id },
        { transaction: t }
      );
    });
  }
}

export default CreatePayment;
