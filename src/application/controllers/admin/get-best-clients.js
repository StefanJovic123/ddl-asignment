export default ({ GetBestClients }) => async (req, res, next) => {
  try {
    const { query } = req;

    // start - start date in format - yyyy-mm-dd
    // end - end date in format - yyyy-mm-dd
    const { start, end, limit = 2 } = query;

    const result = await GetBestClients.execute(`${start}T00:00`, `${end}T:24:00`, limit);
    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}