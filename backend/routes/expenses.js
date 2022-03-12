const express = require("express");
const {
  getExpenses,
  setExpense,
  deleteExpense,
  populateDB,
  setLimit,
  getLimit,
} = require("../controllers/expenses");

// const { getChart } = require("../controllers/charts");

const router = express.Router();

router.route("/").get(getExpenses).post(setExpense);

// router.route("/charts/:chart").get(getChart);

// router.route("/test").get(populateDB);

router.route("/:id").put(setExpense).delete(deleteExpense);

// router.route("/budgeting").post(getExpenses);

router.route("/budgeting/limit").get(getLimit).post(setLimit);

module.exports = router;
