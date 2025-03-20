import { Router } from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController";
import { authMiddleware } from "../middleware/isAuthenticated";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.get("/", getProducts); 
router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);


export default router;  