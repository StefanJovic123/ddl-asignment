import initializeModels from './models';

const DEFAULT_CONFIGURATIONS = {
  SQLITE: {
    dialect: 'sqlite'
  },

  // ... other configurations for other types of Dbs ...
};

/**
 * 
 * @param {string} type - type of DB connection ex: SQLITE, POSTGRES, MYSQL
 * @param {Object} config - configuration object that contain necessary connection details
 * @returns 
 */
const resolveConfiguration = (type, config = {}) => {
  if (!type) {
    return {};
  }

  const dbConfig = config.DB[type];
  if (!dbConfig) {
    throw new Error(`DB Connection type: ${type} has not been found`);
  }

  if (config.General.ENVIRONMENT !== 'DEV' && type === 'SQLITE') {
    throw new Error('Production or Staging DB can not be SQLITE')
  }

   // If connection is SQLITE then connection is very simple so we return just
   // default configuration as only necessary one
  if (type === 'SQLITE') {
    return {
      ...DEFAULT_CONFIGURATIONS[type],
      ...dbConfig
    };
  }

  // local docker postgres instance does not work without this
  // Also skip SQLITE as production 
  let dialectOptions;
  if (process.env.ENVIRONMENT === 'PROD') {
    dialectOptions = {
      ssl: {
        require: dbConfig.USE_SSL,
        rejectUnauthorized: dbConfig.SSL_REJECT_UNAUTHORIZED,
      },
    };
  }

  return {
    database: dbConfig.DATABASE,
    username: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.DIALECT || DEFAULT_CONFIGURATIONS[type].dialect,
    dialectOptions,
    define: { timestamps: dbConfig.DEFINE_TIMESTAMPS },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
};

/**
 * @param {Object} config - configuration object that contain necessary connection details
 */
export default async (config) => ({
  SQLITE: await initializeModels(resolveConfiguration('SQLITE', config)),
});