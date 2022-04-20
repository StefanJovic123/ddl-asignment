export default ({ CreateDeposit }) => async (req, res, next) => {
  try {
    const { id } = req.params;
    await CreateDeposit.execute(id, req.body.amount);
    return res.sendEmpty()
  } catch (error) {
    next(error);
  }
};
