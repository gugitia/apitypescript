import { Router } from "express";
import { OrderController } from "../controller/orderController";

const router = Router();

router.get("/", OrderController.list);
router.get("/:id", OrderController.getById);
router.post("/", OrderController.create);
router.put("/:id", OrderController.update);
router.delete("/:id", OrderController.delete);

export default router;
