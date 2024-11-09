import { Request } from "express";
import { SelectQueryBuilder , sql} from "kysely";
import { z } from "zod";
import { DB } from "../database"; 

export function addProductFilters(
  req: Request,
  query: SelectQueryBuilder<DB, "product", {}>
) {
  // Filter by product_id (number)
  if (
    req.query.product_id &&
    z.coerce.number().safeParse(req.query.product_id).success
  ) {
    query = query.where("product.product_id", "=", z.coerce.number().parse(req.query.product_id));
  }

  // Filter by product_name (string)
  if (
    req.query.product_name &&
    z.string().safeParse(req.query.product_name).success
  ) {

    const productName = typeof req.query.product_name === "string"
    ? req.query.product_name.toLowerCase()
    : req.query.product_name;
   
    query = query.where(
      sql`LOWER(product.product_name)`,
      "like",
     `%${productName}%`
    );
  }

  // Filter by product_category_id (number or null)
  if (
    req.query.product_category_id &&
    z.coerce.number().safeParse(req.query.product_category_id).success
  ) {
    query = query.where("product.product_category_id", "=", z.coerce.number().parse(req.query.product_category_id));
  }

  // Filter by product_new_price (number or null)
  if (
    req.query.product_new_price &&
    z.coerce.number().safeParse(req.query.product_new_price).success
  ) {
    query = query.where("product.product_new_price", "=", z.coerce.number().parse(req.query.product_new_price));
  }

    // Filter by dynamic price range (min and max price)
  const minPrice = req.query.min_price ? z.coerce.number().safeParse(req.query.min_price).success && Number(req.query.min_price) : null;
  const maxPrice = req.query.max_price ? z.coerce.number().safeParse(req.query.max_price).success && Number(req.query.max_price) : null;

  if (minPrice || maxPrice) {
    if (minPrice) {
      query = query.where("product.product_new_price", ">=", minPrice);
    }
    if (maxPrice) {
      query = query.where("product.product_new_price", "<=", maxPrice);
    }
  }

  


  return query;
}
