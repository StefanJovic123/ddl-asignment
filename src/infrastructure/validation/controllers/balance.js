import Joi from 'joi';
import common from './common';

export default {
  deposit: {
    params: common.idParam,
    body: Joi.object({
      amount: Joi.number().positive().required()
    })
  },
};
