import validate from '@application/middlewares/httpRequest/validate';
import validationSchemes from '@infrastructure/validation/controllers/job';

import getAllUnpaid from './get-all-unpaid';
import payJob from './pay-job';


export default (
  // UseCases
  { JobUseCases },

  // Middlewares
  { Authenticate, Authorize },
) => [
  {
    handler: getAllUnpaid(JobUseCases),
    method: 'GET',
    path: '/jobs/unpaid',
    middlewares: [
      Authenticate,
    ],
    environments: ['prod', 'dev', 'staging'],
  },
  {
    handler: payJob(JobUseCases),
    method: 'POST',
    path: '/jobs/:job_id/pay',
    middlewares: [
      validate(validationSchemes.jobPay.params, 'params'),
      validate(validationSchemes.jobPay.body, 'body'),
      Authenticate,
      Authorize('client')
    ],
    environments: ['prod', 'dev', 'staging'],
  },
];