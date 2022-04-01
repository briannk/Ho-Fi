const express = require("express");
const {
  getIncome,
  setIncome,
  deleteIncome,
  populateDB,
} = require("../controllers/income");

const router = express.Router();

router.route("/").get(getIncome).post(setIncome).put(setIncome);

// toggle during development
// router.route("/test").get(populateDB);

router.route("/:id").delete(deleteIncome);

module.exports = router;
