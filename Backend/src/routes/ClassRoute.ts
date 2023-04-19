import { Router } from "express"
import ClassController from "../controllers/ClassController"
import Authenticate from "../middlewares/Authenticate";

const router = Router()

router.get("/", ClassController.GetClasses)
router.post("/", Authenticate.authenticate, Authenticate.authorize, ClassController.CreateClass)
router.get("/:id", Authenticate.authenticate, ClassController.GetClass)
router.put("/:id", Authenticate.authenticate, Authenticate.authorize, ClassController.UpdateClass)
router.delete("/:id", Authenticate.authenticate, Authenticate.authorize, ClassController.DeleteClass)

export default router
