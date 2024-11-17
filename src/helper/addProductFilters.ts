import { Request } from "express";
import { SelectQueryBuilder, sql } from "kysely";
import { z } from "zod";
import { DB } from "../database";

// Utility function to check if a value is a valid number
function isValidNumber(value: any): boolean {
  return z.coerce.number().safeParse(value).success;
}

// Utility function to handle string filtering
function handleStringFilter(value: any): string | undefined {
  return typeof value === "string" ? value.toLowerCase() : undefined;
}

// Utility function to handle price range filtering
function getPriceRange(minPrice: any, maxPrice: any) {
  const min = minPrice ? isValidNumber(minPrice) && Number(minPrice) : null;
  const max = maxPrice ? isValidNumber(maxPrice) && Number(maxPrice) : null;
  return { min, max };
}

export function addProductFilters(
  productFilterReq: Request,
  query: SelectQueryBuilder<DB, "product", {}>
) {
  // Filter by product_id (number)
  if (productFilterReq.query.product_id && isValidNumber(productFilterReq.query.product_id)) {
    query = query.where("product.product_id", "=", Number(productFilterReq.query.product_id));
  }

  // Filter by product_name (string)
  const productName = handleStringFilter(productFilterReq.query.product_name);
  if (productName) {
    query = query.where(sql`LOWER(product.product_name)`, "like", `%${productName}%`);
  }

  // Filter by product_category_id (number or null)
  if (productFilterReq.query.product_category_id && isValidNumber(productFilterReq.query.product_category_id)) {
    query = query.where("product.product_category_id", "=", Number(productFilterReq.query.product_category_id));
  }

  // Filter by product_new_price (number or null)
  if (productFilterReq.query.product_new_price && isValidNumber(productFilterReq.query.product_new_price)) {
    query = query.where("product.product_new_price", "=", Number(productFilterReq.query.product_new_price));
  }

  // Filter by dynamic price range (min and max price)
  const { min, max } = getPriceRange(productFilterReq.query.min_price, productFilterReq.query.max_price);
  
  if (min || max) {
    if (min) {
      query = query.where("product.product_new_price", ">=", min);
    }
    if (max) {
      query = query.where("product.product_new_price", "<=", max);
    }
  }

  return query;
}
