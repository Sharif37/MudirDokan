// src/services/productService.ts
import * as productModel from "../models/productModel";
import { Product, ProductCategory, ProductInsert, ProductUpdate } from "../database";
import { db } from "../database";

// Get a product by ID
export async function getProduct(productId: number) {
  return await productModel.getProductById(productId);
}

// Create a new product
export async function createProduct(productData: ProductInsert) {
  return await productModel.createProduct(productData);
}

// Update an existing product
export async function updateProduct(productId: number, productData: ProductUpdate) {
  await productModel.updateProduct(productId, productData);
}

// Delete a product
export async function deleteProduct(productId: number) {
  await productModel.deleteProduct(productId);
}

// Get all categories
export  function getAllCategories() {
  return  productModel.getAllCategories();
}

// Get all products by category
export  function getProductsByCategoryId(categoryId: number) {
  return  productModel.getProductsByCategoryId(categoryId);
}


