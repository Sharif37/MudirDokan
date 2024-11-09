import { Request } from "express";
import { SelectQueryBuilder } from "kysely";
import {  TableName } from "../database";
import { DB } from "../database";
import { addProductFilters } from "../helper/addProductFilters";
import { addCategoryFilters } from "./addCategoryFilters";


export function addFiltration(
  table: TableName,
  query: SelectQueryBuilder<DB, TableName, any>,
  req: Request,
) {

  if (table === "product") {
    query = addProductFilters(req, query as any);
  }
   else if(table === "product_category"){
    query= addCategoryFilters(req,query as any);
  }




  return query as any;
}
