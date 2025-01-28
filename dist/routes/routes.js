"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
const routes = (0, express_1.Router)();
routes.use("/usuarios", userRoutes_1.default);
routes.use("/produtos", productRoutes_1.default);
routes.use("/pedido", orderRoutes_1.default);
exports.default = routes;
