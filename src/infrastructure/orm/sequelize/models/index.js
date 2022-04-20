import connect from '../connection';
import { initializeOrm } from '../helpers';
import { DB_TYPES } from '../types';

// models
import Profile from './Profile';
import Job from './Job';
import Contract from './Contract';

export const modelClasses = {
  Profile,
  Job,
  Contract,
};

export default async (config) => {
  const connection = await connect(config);
  return initializeOrm(modelClasses, connection, DB_TYPES);
};