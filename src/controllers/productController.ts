import { Request, Response } from "express";
import { z } from "zod";
import { addFiltration } from "../helper/addFiltration";
import { paginatedResults } from "../helper/paginatedResults";
import * as productService from "../services/productService";
import logger from "../logger"; 

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
export async function getProduct(productRequest: Request, productResponse: Response) {
  try {
    const productId = parseInt(productRequest.params.id);
    logger.info(`Fetching product with ID: ${productId}`);
    const product = await productService.getProduct(productId);
    if (product) {
      logger.info(`Product found with ID: ${productId}`);
      productResponse.status(200).json(product);
    } else {
      logger.warn(`Product not found with ID: ${productId}`);
      productResponse.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    logger.error(`Error fetching product with ID: ${productRequest.params.id}`, error);
    productResponse.status(500).json({ message: "Error fetching product", error });
  }
}

// Create a new product
export async function createProduct(createProductRequest: Request, createProductResponse: Response) {
  try {
    logger.info("Creating a new product...");
    const productData = ProductSchema.parse(createProductRequest.body);
    logger.debug("Product data parsed successfully", { productData });

    const formattedProductData = {
      ...productData,
      product_description: productData.product_description
        ? JSON.stringify(productData.product_description)
        : null,
      product_term_and_condition: productData.product_term_and_condition
        ? JSON.stringify(productData.product_term_and_condition)
        : null,
    };

    const createdProduct = await productService.createProduct(formattedProductData);
    logger.info("Product created successfully", { createdProduct });
    createProductResponse.status(201).json({
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn("Validation error while creating product", error.errors);
      createProductResponse.status(400).json({ message: "Invalid input", details: error.errors });
    } else {
      logger.error("Error creating product", error);
      createProductResponse.status(500).json({ message: "Error creating product", error });
    }
  }
}

// Update a product
export async function updateProduct(productUpdateRequest: Request, productUpdateResponse: Response) {
  try {
    const productId = parseInt(productUpdateRequest.params.id);
    logger.info(`Updating product with ID: ${productId}`);
    const productData = ProductSchema.partial().parse(productUpdateRequest.body);

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
    logger.info(`Product updated successfully with ID: ${productId}`);
    productUpdateResponse.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn("Validation error while updating product", error.errors);
      productUpdateResponse.status(400).json({ message: "Invalid input", details: error.errors });
    } else {
      logger.error(`Error updating product with ID: ${productUpdateRequest.params.id}`, error);
      productUpdateResponse.status(500).json({ message: "Error updating product", error });
    }
  }
}

// Delete a product
export async function deleteProduct(productDeleteRequest: Request, productDeleteResponse: Response) {
  try {
    const productId = parseInt(productDeleteRequest.params.id);
    logger.info(`Deleting product with ID: ${productId}`);
    await productService.deleteProduct(productId);
    logger.info(`Product deleted successfully with ID: ${productId}`);
    productDeleteResponse.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting product with ID: ${productDeleteRequest.params.id}`, error);
    productDeleteResponse.status(500).json({ message: "Error deleting product", error });
  }
}

// Fetch all product categories
export async function getAllCategories(categoriesRequest: Request, categoriesResponse: Response) {
  try {
    logger.info("Fetching all categories...");
    var query = productService.getAllCategories();
    query = addFiltration("product_category", query, categoriesRequest);
    paginatedResults(query as any, categoriesRequest, categoriesResponse);
    logger.info("Categories fetched successfully");
  } catch (error) {
    logger.error("Error fetching categories", error);
    categoriesResponse.status(500).json({ message: "Error fetching categories", error });
  }
}

// Fetch products by category
export async function getProductsByCategory(productByCategoryReq: Request, productByCategoryRes: Response) {
  try {
    const categoryId = parseInt(productByCategoryReq.params.categoryId);
    logger.info(`Fetching products for category ID: ${categoryId}`);

    if (isNaN(categoryId)) {
      logger.warn("Invalid category ID provided");
      return productByCategoryRes.status(400).json({ message: "Invalid category ID" });
    }

    var query = productService.getProductsByCategoryId(categoryId);
    query = addFiltration("product", query, productByCategoryReq);
    paginatedResults(query as any, productByCategoryReq, productByCategoryRes);
    logger.info(`Products fetched successfully for category ID: ${categoryId}`);
  } catch (error) {
    logger.error(`Error fetching products by category ID: ${productByCategoryReq.params.categoryId}`, error);
    productByCategoryRes.status(500).json({ message: "Error fetching products by category", error });
  }
}
