import Repository from '../Repository';
import { sequelize } from '@infrastructure/orm/sequelize/SequelizeModel';

export default class ProfileRepository extends Repository {
  async findClientsWithMostPaidJobs(startDate, endDate, limit = 2) {

    // THIS WILL NOT WORK WHEN DB IS CHANGED FOR NOSQL DB or DB that does not Support some of used SQL functions
    // Which is unlikely scenario but still possible!
    const result = await this.dbConnection.query(
      `
        SELECT profiles.id as id, SUM(jobs.price) as paid,  profiles.firstName || '  ' || profiles.lastName as fullName  
        FROM profiles JOIN contracts ON contracts.ClientId = profiles.id AND profiles.deletedAt IS NULL 
        JOIN jobs ON jobs.ContractId = contracts.id AND contracts.deletedAt IS NULL AND jobs.paid = 1 
        WHERE profiles.type = 'client'  
        AND jobs.paymentDate >= ?
        AND jobs.paymentDate <= ? 
        GROUP BY jobs.ContractId 
        ORDER BY paid DESC
        LIMIT ?
      `,
      {
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: false,

        // The type of query you are executing. The query type affects how results are formatted before they are passed back.
        type: sequelize.QueryTypes.SELECT,

        replacements: [startDate, endDate, limit],
      }
    );

    return result;
  }

  async findMostPaidProfession(startDate, endDate) {

    // THIS WILL NOT WORK WHEN DB IS CHANGED FOR NOSQL DB or DB that does not Support some of used SQL functions
    // Which is unlikely scenario but still possible!
    const result = await this.dbConnection.query(
      `
        SELECT profiles.profession from profiles 
        JOIN contracts ON contracts.ContractorId = profiles.id  AND contracts.deletedAt IS NULL
        JOIN jobs on contracts.id = jobs.ContractId  AND jobs.paid = 1 AND jobs.deletedAt IS NULL
        WHERE jobs.paymentDate >= ?
        AND jobs.paymentDate <= ?
        GROUP BY profession
        ORDER BY paid DESC LIMIT 1
      `,
      {
        plain: true,
        raw: false,
        type: sequelize.QueryTypes.SELECT,
        replacements: [startDate, endDate],
      }
    );

    return result;
  }
}
