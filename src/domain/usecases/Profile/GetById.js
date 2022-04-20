class GetById {
  constructor(ProfileService) {
    this.profileService = ProfileService;
  }

  async execute(id) {
    return this.profileService.getById(id);
  }
}

export default GetById;
