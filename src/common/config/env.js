import '../../../loadEnv';

export default {
  General: {
    ENVIRONMENT: process.env.ENVIRONMENT || 'DEV',
    SERVER_LOCATION: `http://localhost:${process.env.PORT}`,
    PORT: process.env.PORT,
    DB_TYPE: process.env.DB_TYPE || 'SQLITE',
  },
  DB: {
    SQLITE: {
      storage: 'database.sqlite3',
    },
  },
};
