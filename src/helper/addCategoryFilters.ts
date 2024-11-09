import { Request } from "express";
import { SelectQueryBuilder, sql } from "kysely";
import { z } from "zod";
import { DB } from "../database";

const CategoryFiltersSchema = z.object({
  category_name: z.string().optional(),
  parent_category_id: z.number().optional(),
  product_category_description: z.string().optional(),
});

export function addCategoryFilters(
  req: Request,
  query: SelectQueryBuilder<DB, "product_category", {}>
) {
  const filters = CategoryFiltersSchema.parse(req.query);

  if (filters.category_name) {
    query = query.where(
      sql`LOWER(product_category.category_name)`,
      "like",
     `%${filters.category_name.toLowerCase()}%`
    );
  }

  if (filters.parent_category_id) {
    query = query.where("product_category.parent_category_id", "=", filters.parent_category_id);
  }

  if (filters.product_category_description) {
    query = query.where(
      sql`LOWER(product_category.product_category_description)`,
      "like",
      `%${filters.product_category_description.toLowerCase()}%`
    );
  }

  return query;
}
