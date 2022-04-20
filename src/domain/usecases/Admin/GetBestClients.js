class GetBestClients {
  constructor(AdminService) {
    this.adminService = AdminService;
  }

  async execute(startDate, endDate, limit = 2) {
    return this.adminService.getBestClients(startDate, endDate, limit);
  }
}

export default GetBestClients;
