import { Router } from "express"
import StudentController from "../controllers/StudentController"
import Authenticate from "../middlewares/Authenticate";

const router = Router()

router.get("/", Authenticate.authenticate, StudentController.GetStudents)
router.get("/:id", Authenticate.authenticate, StudentController.GetStudent)
router.put("/:id", Authenticate.authenticate, StudentController.UpdateStudent)
router.delete("/:id", Authenticate.authenticate, StudentController.DeleteStudent)
router.get("/:id/grades", Authenticate.authenticate, StudentController.GetStudentGrades)

export default router