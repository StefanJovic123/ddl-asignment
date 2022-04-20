// Repositories
import ProfileRepository from './ProfileRepository';
import ContractRepository from './ContractRepository';
import JobRepository from './JobRepository';

// Model Schemas
import profileSchemes from '../models/profile';
import contractSchemes from '../models/contract';

/**
 * 
 * @param {Object} models - keys of this object are names of DB models
 * @param {*} dbConnection - RAW Db connection of connected ORM (in this case Sequelize)
 * @returns 
 */
export default (models, dbConnection) => ({
  ProfileRepository: new ProfileRepository(models.Profile, profileSchemes, dbConnection),
  ContractRepository: new ContractRepository(models.Contract, contractSchemes, dbConnection),
  JobRepository: new JobRepository(models.Job, {}, dbConnection),
});

