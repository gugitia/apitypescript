import { Router } from "express";
import { userController } from "../controller/userController/userController";

const router = Router();

router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);
router.post("/", userController.register);
router.post("/login", userController.login);

export default router;
