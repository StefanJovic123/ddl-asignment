import validate from '@application/middlewares/httpRequest/validate';
import commonValidationSchemes from '@infrastructure/validation/controllers/admin';

import getBestClients from './get-best-clients';
import getBestProfession from './get-best-profession';

export default (
  // UseCases
  { AdminUseCases },

  // Middlewares
  { Authenticate },
) => [
  {
    handler: getBestClients(AdminUseCases),
    method: 'GET',
    path: '/admin/best-clients',
    middlewares: [
      Authenticate,
      validate(commonValidationSchemes.bestClients.query, 'query')
    ],
    environments: ['prod', 'dev', 'staging'],
  },
  {
    handler: getBestProfession(AdminUseCases),
    method: 'GET',
    path: '/admin/best-profession',
    middlewares: [
      Authenticate,
      validate(commonValidationSchemes.bestProfession.query, 'query')
    ],
    environments: ['prod', 'dev', 'staging'],
  },
];