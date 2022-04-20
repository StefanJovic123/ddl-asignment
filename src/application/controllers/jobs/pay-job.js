export default ({ CreatePayment }) => async (req, res, next) => {
  try {
    const { job_id } = req.params;
    await CreatePayment.execute(job_id, req.profile.id, req.body.amount);
    return res.sendEmpty()
  } catch (error) {
    next(error);
  }
}
