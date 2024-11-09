import express from "express";
import * as productController from "../controllers/productController";
import { requireRole, verifySession } from "./auth/auth";
import { Roles } from "./auth/roles";

const productRouter = express.Router();

// CRUD operations for product
productRouter.get(
  "/:id",
  verifySession,
  requireRole([Roles.Admin]),
  productController.getProduct
);
productRouter.post(
  "/",
  verifySession,
  requireRole([Roles.Admin]),
  productController.createProduct
);
productRouter.put(
  "/:id",
  verifySession,
  requireRole([Roles.Admin]),
  productController.updateProduct
);
productRouter.delete(
  "/:id",
  verifySession,
  requireRole([Roles.Admin]),
  productController.deleteProduct
);

// Fetch all product categories
productRouter.get(
  "/category/all",
  verifySession,
  requireRole([Roles.Admin]),
  productController.getAllCategories
);

// Fetch products by category
productRouter.get(
  "/category/:categoryId",
  verifySession,
  requireRole([Roles.Admin]),
  productController.getProductsByCategory
);

export default productRouter;
