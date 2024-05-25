const router = require("express").Router();
const {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
} = require("../controller/task");

const mustAuth = require("../middleware/isAuthenticated");
// create
router.post("/", mustAuth, createTask);

// read
router.get("/", mustAuth, getAllTask);

// update
router.put("/:id", mustAuth, updateTask);

// delete

router.delete("/", mustAuth, deleteTask);

module.exports = router;
