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
  addCategoryFilterRequest: Request,
  query: SelectQueryBuilder<DB, "product_category", {}>
) {
  const filters = CategoryFiltersSchema.parse(addCategoryFilterRequest.query);

  const hasCategoryNameFilter = Boolean(filters.category_name);
  const hasParentCategoryIdFilter = Boolean(filters.parent_category_id);
  const hasDescriptionFilter = Boolean(filters.product_category_description);

  if (hasCategoryNameFilter) {
    query = query.where(
      sql`LOWER(product_category.category_name)`,
      "like",
      `%${filters.category_name!.toLowerCase()}%`
    );
  }

  if (hasParentCategoryIdFilter) {
    query = query.where(
      "product_category.parent_category_id",
      "=",
      filters.parent_category_id!
    );
  }

  if (hasDescriptionFilter) {
    query = query.where(
      sql`LOWER(product_category.product_category_description)`,
      "like",
      `%${filters.product_category_description!.toLowerCase()}%`
    );
  }

  return query;
}
