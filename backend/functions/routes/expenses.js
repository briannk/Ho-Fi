const express = require("express");
const {
  getExpenses,
  setExpense,
  deleteExpense,
  populateDB,
  setLimit,
  getLimit,
} = require("../controllers/expenses");

const router = express.Router();

router.route("/").get(getExpenses).post(setExpense);

// toggle during development
// router.route("/test").get(populateDB);

router.route("/:id").put(setExpense).delete(deleteExpense);

router.route("/budgeting/limit").get(getLimit).post(setLimit);

module.exports = router;
