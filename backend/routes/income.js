const express = require("express");
const {
  getIncome,
  setIncome,
  deleteIncome,
  populateDB,
} = require("../controllers/income");

// const { getChart } = require("../controllers/charts");

const router = express.Router();

router.route("/").get(getIncome).post(setIncome).put(setIncome);

// router.route("/charts/:chart").get(getChart);

router.route("/test").get(populateDB);

router.route("/:id").delete(deleteIncome);

module.exports = router;
