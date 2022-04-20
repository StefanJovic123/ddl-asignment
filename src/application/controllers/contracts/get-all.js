export default ({ GetAll }) => async (req, res, next) => {
  try {
    const result = await GetAll.execute(req.profile);
    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}