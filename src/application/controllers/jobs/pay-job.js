export default ({ CreatePayment }) => async (req, res, next) => {
  try {
    const { jobId } = req.params;
    await CreatePayment.execute(jobId, req.profile.id, req.body.amount);

    return res.sendEmpty()
  } catch (error) {
    next(error);
  }
}
