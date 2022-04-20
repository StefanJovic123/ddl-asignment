// import validate from '@application/middlewares/httpRequest/validate';
// import commonValidationSchemes from '@infrastructure/validation/controllers/common';

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
      Authenticate,
      Authorize('client')
    ],
    environments: ['prod', 'dev', 'staging'],
  },
];