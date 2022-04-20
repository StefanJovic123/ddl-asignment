import Service from '../Service';

export default class ContractService extends Service {
  async getAllByClient(clientId, includeTerminated = false) {
    return this.repository.findAllByClient(clientId, includeTerminated);
  }

  async getAllByContractor(clientId, includeTerminated = false) {
    return this.repository.findAllByContractor(clientId, includeTerminated);
  }
}
