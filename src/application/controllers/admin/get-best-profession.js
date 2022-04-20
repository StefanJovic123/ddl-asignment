import { dateFormat } from '@common/utils';

export default ({ GetBestProfession }) => async (req, res, next) => {
  try {
    const { query } = req;

    // start - start date in format - yyyy-mm-dd
    // end - end date in format - yyyy-mm-dd
    const { start, end } = query;

    const result = await GetBestProfession.execute(`${dateFormat(start)}T00:00`, `${dateFormat(end)}T:24:00`);
    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}