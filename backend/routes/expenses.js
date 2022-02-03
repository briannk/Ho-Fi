const express = require("express");

const {
  getExpenses,
  getSomeExpenses,
  setExpense,
  deleteExpense,
  populateDB,
} = require("../controllers/expenses");

const { getChart } = require("../controllers/charts");

const router = express.Router();

// router.use(validateToken);

router.route("/").get(getExpenses).post(setExpense).put(setExpense);

// // create controllers to return appropriate data
// // for client to utilize
router.route("/charts/:chart").get(getChart);

router.route("/test").get(populateDB);

router.route("/:id").delete(deleteExpense);

router.route("/budgeting").post(getExpenses);

module.exports = router;
