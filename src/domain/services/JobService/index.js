import Service from '../Service';

export default class JobService extends Service {
  async getAllUnpaid(profileId, profileType, options) {
    return this.repository.findAllUnpaid(profileId, profileType, options);
  }
}
