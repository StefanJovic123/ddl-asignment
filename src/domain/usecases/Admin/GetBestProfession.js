class GetBestProfession {
  constructor(AdminService) {
    this.adminService = AdminService;
  }

  async execute(startDate, endDate, limit = 2) {
    return this.adminService.getBestProfession(startDate, endDate, limit);
  }
}

export default GetBestProfession;
