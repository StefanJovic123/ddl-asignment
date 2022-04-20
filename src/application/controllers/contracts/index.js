import validate from '@application/middlewares/httpRequest/validate';
import commonValidationSchemes from '@infrastructure/validation/controllers/common';

import getAll from './get-all';
import getById from './get-by-id';

export default (
  // UseCases
  { ContractUseCases },

  // Middlewares
  { Authenticate },
) => [
  {
    handler: getAll(ContractUseCases),
    method: 'GET',
    path: '/contracts',
    middlewares: [
      Authenticate,
    ],
    environments: ['prod', 'dev', 'staging'],
  },
  {
    handler: getById(ContractUseCases),
    method: 'GET',
    path: '/contracts/:id',
    middlewares: [
      Authenticate,
      validate(commonValidationSchemes.idParam, 'params'),
    ],
    environments: ['prod', 'dev', 'staging'],
  },
];