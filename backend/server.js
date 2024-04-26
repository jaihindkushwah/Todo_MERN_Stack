const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/user", userRouter);

app.use("/api/task", taskRouter);

app.listen(port, () => console.log(`Express app listening on port ${port}!`));
