import Joi from 'joi';
import common from './common';

export default {
  bestProfession: {
    query: Joi.object({
      start: Joi.date().iso().required(),
      end: Joi.date().iso().required()
    }),
  },
  bestClients: {
    query: Joi.object({
      start: Joi.date().iso().required(),
      end: Joi.date().iso().required(),
      limit: common.limit
    })
  }
};
