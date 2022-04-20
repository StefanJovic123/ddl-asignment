// This Service is not extending base Service, cause this service do not need basic service methods
// And can possibly need multiple repositories in order to get proper data
export default class AdminService {
  constructor(ProfileRepository) {
    this.profileRepository = ProfileRepository;
  }

  async getBestClients(startDate, ednDate, limit = 2) {
    return this.profileRepository.findClientsWithMostPaidJobs(startDate, ednDate, limit);
  }

  async getBestProfession(startDate, ednDate) {
    return this.profileRepository.findMostPaidProfession(startDate, ednDate);
  }
}
