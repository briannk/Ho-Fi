const express = require("express");
const app = express();

// routers
const expenses = require("./routes/expenses");
app.use("/api/v1/expenses", expenses);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
