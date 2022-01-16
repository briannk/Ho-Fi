const getExpenses = (req, res) => {
  res.status(200).send({ success: true, payload: "some expenses" });
};

module.exports = {
  getExpenses,
};
