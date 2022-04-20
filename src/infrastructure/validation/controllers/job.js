import Joi from 'joi';
import { id } from './common';

export default {
  jobPay: {
    params: Joi.object({
      job_id: id
    }),
    body: Joi.object({
      amount: Joi.number().positive().required()
    })
  },
};
