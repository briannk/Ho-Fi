const express = require("express");
const cors = require("cors")({ origin: true });
const { validateToken } = require("./controllers/auth");

const app = express();

const corsOptions = {
  origin: "https://ho-fi-598a7.web.app",
};

app.use(cors(corsOptions));

// toggle during development
// app.use(cors);

app.use(validateToken);

// routers
const expenses = require("./routes/expenses");
const income = require("./routes/income");

app.use("/api/v1/expenses", expenses);
app.use("/api/v1/income", income);

module.exports = app;

// // uncomment when not hosted on firebase
// const PORT = process.env.PORT || 5000;
// app.listen(PORT);
