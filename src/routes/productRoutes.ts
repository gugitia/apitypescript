import { Router } from "express";
import { productController } from "../controller/productController/productController";

const router = Router();

router.get("/:id", productController.getById);
router.get("/", productController.listProducts);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

export default router;
