const express = require("express");
const router = require("./routes");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api/todo", router);
app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use("/api/todo", errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
