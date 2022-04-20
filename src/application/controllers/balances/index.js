import validate from '@application/middlewares/httpRequest/validate';
import validationSchemes from '@infrastructure/validation/controllers/balance';

import deposit from './deposit';

export default (
  // UseCases
  { BalanceUseCases },
) => [

  // It is assumed that this endpoint is public without authorization or authentication middlewares
  // this is done this way considering that text in reqs is as like this:  Deposits money into the the the balance of a client
  // It implies that deposit can be done for all clients regardless who is user who makes deposits
  // Also url requires :userId param, also cause of that this endpoint has been made public
  {
    handler: deposit(BalanceUseCases),
    method: 'POST',
    path: '/balances/deposit/:id',
    middlewares: [
      validate(validationSchemes.deposit.params, 'params'),
      validate(validationSchemes.deposit.body, 'body'),
    ],
    environments: ['prod', 'dev', 'staging'],
  },
];