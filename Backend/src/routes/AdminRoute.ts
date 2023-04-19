import { Router } from "express"
import { AdminController } from "../controllers/AdminController"
import Authenticate from "../middlewares/Authenticate";

const router = Router()

router.get("/", Authenticate.authenticate, AdminController.GetAdmins)
router.post("/", Authenticate.authenticate, Authenticate.authorize, AdminController.CreateAdmin)
router.get("/:id", Authenticate.authenticate, AdminController.GetAdmin)
router.put("/:id", Authenticate.authenticate, Authenticate.authorize, AdminController.UpdateAdmin)
router.delete("/:id", Authenticate.authenticate, Authenticate.authorize, AdminController.DeleteAdmin)

export default router