export default ({ GetById }) => async (req, res, next) => {
  try {
    const { params, profile } = req;
    const result = await GetById.execute(params.id, profile);
    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
};
