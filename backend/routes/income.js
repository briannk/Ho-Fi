const express = require("express");
const {
  getIncome,
  setIncome,
  deleteIncome,
} = require("../controllers/expenses");

const router = express.Router();

router
  .route("/")
  .get(getIncome)
  .post(setIncome)
  .put(setIncome)
  .delete(deleteIncome);

module.exports = router;
