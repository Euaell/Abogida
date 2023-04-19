import { Router } from "express"
import SubjectController from "../controllers/SubjectController"
import Authenticate from "../middlewares/Authenticate";

const router = Router()

router.get("/", Authenticate.authenticate, SubjectController.GetSubjects)
router.post("/", Authenticate.authenticate, Authenticate.authorize, SubjectController.CreateSubject)
router.get("/:id", Authenticate.authenticate, SubjectController.GetSubject)
router.put("/:id", Authenticate.authenticate, Authenticate.authorize, SubjectController.UpdateSubject)
router.delete("/:id", Authenticate.authenticate, Authenticate.authorize, SubjectController.DeleteSubject)

export default router
