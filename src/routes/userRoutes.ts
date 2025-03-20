import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/isAuthenticated";
import { isAdmin } from "../middleware/isAdmin";


const router = Router();

router.get("/", authMiddleware, getUsers);
router.post("/", authMiddleware, isAdmin, createUser);
router.put("/:id", authMiddleware, isAdmin, updateUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);


export default router;