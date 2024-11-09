import { Request, Response } from "express";
import { z } from "zod";
import { addFiltration } from "../helper/addFiltration";
import { paginatedResults } from "../helper/paginatedResults";
import * as productService from "../services/productService";

const ProductSchema = z.object({
  product_name: z.string().nullable(),
  product_new_price: z.number().nullable(),
  product_old_price: z.number().nullable(),
  product_description: z.object({ details: z.string() }).nullable().optional(),
  product_category_id: z.number().nullable(),
  product_term_and_condition: z
    .object({ terms: z.string() })
    .nullable()
    .optional(),
});

// Fetch a product by ID
export async function getProduct(req: Request, res: Response) {
  try {
    const productId = parseInt(req.params.id);
    const product = await productService.getProduct(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
}

// Create a new product
export async function createProduct(req: Request, res: Response) {
  try {
    const productData = ProductSchema.parse(req.body);

    const formattedProductData = {
      ...productData,
      product_description: productData.product_description
        ? JSON.stringify(productData.product_description)
        : null,
      product_term_and_condition: productData.product_term_and_condition
        ? JSON.stringify(productData.product_term_and_condition)
        : null,
    };

    const createdProduct =
      await productService.createProduct(formattedProductData);
    res.status(201).json({
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid input", details: error.errors });
    } else {
      res.status(500).json({ message: "Error creating product", error });
    }
  }
}
// Update a product
export async function updateProduct(req: Request, res: Response) {
  try {
    const productId = parseInt(req.params.id);
    const productData = ProductSchema.partial().parse(req.body);

    const formattedProductData = {
      ...productData,
      product_description: productData.product_description
        ? JSON.stringify(productData.product_description)
        : null,
      product_term_and_condition: productData.product_term_and_condition
        ? JSON.stringify(productData.product_term_and_condition)
        : null,
    };

    await productService.updateProduct(productId, formattedProductData);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid input", details: error.errors });
    } else {
      res.status(500).json({ message: "Error updating product", error });
    }
  }
}

// Delete a product
export async function deleteProduct(req: Request, res: Response) {
  try {
    const productId = parseInt(req.params.id);
    await productService.deleteProduct(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
}

// Fetch all product categories
export async function getAllCategories(req: Request, res: Response) {
  try {
    var query = productService.getAllCategories();
    query = addFiltration("product_category", query, req);
    paginatedResults(query as any, req, res);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
}

// Fetch products by category
export async function getProductsByCategory(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.categoryId);

    if (isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    var query = productService.getProductsByCategoryId(categoryId);
    query = addFiltration("product", query, req);
    paginatedResults(query as any, req, res);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res
      .status(500)
      .json({ message: "Error fetching products by category", error });
  }
}
