import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTodo,
} from "../controller/todoController";

const router: Router = Router();

router.route("/getTasks").get(getTasks);
router.route("/getTask").get(getTask);
router.route("/createTask").post(createTask);
router.route("/updateTask/:taskID").patch(updateTodo);
router.route("/deleteTask/:taskID").delete(deleteTask);

export default router;
