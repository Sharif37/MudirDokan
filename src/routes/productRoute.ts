import express from "express";
import * as productController from "../controllers/productController";

const productRouter = express.Router();

// CRUD operations for product
productRouter.get("/:id", productController.getProduct);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

// Fetch all product categories
productRouter.get("/category/all", productController.getAllCategories);

// Fetch products by category
productRouter.get("/category/:categoryId", productController.getProductsByCategory);

export default productRouter;
