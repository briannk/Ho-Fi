const express = require("express");
const { getExpenses } = require("../controllers/expenses");
const router = express.Router();

// controllers
const { validateToken } = require("../controllers/auth");

router.get("/", getExpenses);

module.exports = router;
