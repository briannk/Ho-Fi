const express = require("express");
const cors = require("cors");
// firestore stuff
const { initializeApp } = require("firebase-admin/app");
const { validateToken } = require("./controllers/auth");
const { getExpenses } = require("./controllers/expenses");

const app = express();

initializeApp();

app.use(cors());

app.use(validateToken);

// routers
const expenses = require("./routes/expenses");

app.use("/api/v1/expenses", expenses);

module.exports = app;

// // uncomment when not hosted on firebase
// const PORT = process.env.PORT || 5000;
// app.listen(PORT);
