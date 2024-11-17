import { Request } from "express";
import { SelectQueryBuilder } from "kysely";
import { TableName } from "../database";
import { DB } from "../database";
import { addProductFilters } from "../helper/addProductFilters";
import { addCategoryFilters } from "./addCategoryFilters";

// Declare table names as constants
const TABLE_PRODUCT = "product";
const TABLE_PRODUCT_CATEGORY = "product_category";

export function addFiltration(
  table: TableName,
  query: SelectQueryBuilder<DB, TableName, any>,
  req: Request
) {
  if (table === TABLE_PRODUCT) {
    query = addProductFilters(req, query as any);
  } else if (table === TABLE_PRODUCT_CATEGORY) {
    query = addCategoryFilters(req, query as any);
  }

  return query as any;
}
