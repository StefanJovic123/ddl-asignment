export default ({ GetAllUnpaid }) => async (req, res, next) => {
  try {
    const result = await GetAllUnpaid.execute(req.profile);
    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
};
