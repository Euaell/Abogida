import { Router } from "express"

import TeacherController from "../controllers/TeacherController"
import Authenticate from "../middlewares/Authenticate"

const router = Router()

router.get("/", Authenticate.authenticate, TeacherController.GetTeachers)
router.get("/:id", Authenticate.authenticate, TeacherController.GetTeacher)
router.put("/:id", Authenticate.authenticate, Authenticate.authorizeTeacher, TeacherController.UpdateTeacher)
router.delete("/:id", Authenticate.authenticate, Authenticate.authorize, TeacherController.DeleteTeacher)

router.post("/submitgrade", Authenticate.authenticate, Authenticate.authorizeTeacher, TeacherController.CreateGrade)

export default router