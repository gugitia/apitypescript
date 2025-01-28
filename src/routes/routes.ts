import { Router } from "express";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";
import orderRoutes from "./orderRoutes";

const routes = Router();

routes.use("/usuarios", userRoutes);
routes.use("/produtos", productRoutes);
routes.use("/pedido", orderRoutes);

export default routes;
