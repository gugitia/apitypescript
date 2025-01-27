import { Router } from "express";
import { userController } from "../controller/userController";

const router = Router();

router.get("/", userController.list); 
router.post("/", userController.create); 

export default router;
