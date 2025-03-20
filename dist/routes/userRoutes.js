"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var isAuthenticated_1 = require("../middleware/isAuthenticated");
var isAdmin_1 = require("../middleware/isAdmin");
var router = (0, express_1.Router)();
router.get("/", isAuthenticated_1.authMiddleware, userController_1.getUsers);
router.post("/", isAuthenticated_1.authMiddleware, isAdmin_1.isAdmin, userController_1.createUser);
router.put("/:id", isAuthenticated_1.authMiddleware, isAdmin_1.isAdmin, userController_1.updateUser);
router.delete("/:id", isAuthenticated_1.authMiddleware, isAdmin_1.isAdmin, userController_1.deleteUser);
exports.default = router;
