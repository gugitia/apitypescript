import { Router } from "express";
import { productController } from "../controller/productController";

const router = Router();

router.get("/:id", productController.getById);
router.get("/", productController.list);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.update);

export default router;
