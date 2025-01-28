import { Router } from "express";
import { userController } from "../controller/userController";

const router = Router();

router.get("/:id", userController.getById);
router.get("/", userController.list);
router.post("/", userController.create);
router.post("/login", userController.login);

export default router;
