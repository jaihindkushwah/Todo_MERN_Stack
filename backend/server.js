const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/user", userRouter);

app.use("/api/task", taskRouter);
// app.get("/home", (req, res) => {
//   res.status(200).json({ message: "You are now on home page. " });
// });

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Express app listening on port ${port}!`));
