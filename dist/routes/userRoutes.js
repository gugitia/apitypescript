"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.get("/:id", userController_1.userController.getById);
router.post("/login", userController_1.userController.login);
router.get("/", userController_1.userController.list);
router.post("/", userController_1.userController.create);
exports.default = router;
