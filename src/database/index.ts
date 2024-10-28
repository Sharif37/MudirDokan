import { dialect } from "./credentials";
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { ColumnType, Generated, JSONColumnType, Selectable, Insertable, Updateable } from "kysely";

// Define the complete Database schema for Kysely
export interface DB {
  address: Address;
  auth_session: AuthSession;
  product: Product;
  product_category: ProductCategory;
  product_images: ProductImages;
  product_item: ProductItem;
  product_variation: ProductVariation;
  role: Role;
  user_address: UserAddress;
  users: Users;
  variation_options: VariationOptions;
}

// Address table
export interface Address {
  address_id: Generated<number>;
  address_type: string | null;
  country: string | null;
  district: string | null;
  division: string | null;
  post_office: string | null;
  postal_code: string | null;
  thana: string | null;
  union_name: string | null;
  upzilla: string | null;
  village: string | null;
}

// AuthSession table
export interface AuthSession {
  create_at: ColumnType<Date, string | undefined, never> | null;
  expires_at: ColumnType<Date, string | undefined, never> | null;
  is_active: boolean | null;
  session_id: string;
  user_id: string | null;
}

// Product table
export interface Product {
  product_id: Generated<number>;
  product_name: string | null;
  product_category_id: number | null;
  product_old_price: number | null;
  product_new_price: number | null;
  main_image_id: number | null;
  product_image_ids: JSONColumnType<number[]> | null;
  product_description: JSONColumnType<{ details: string }> | null;
  product_term_and_condition: JSONColumnType<{ terms: string }> | null;
}

// ProductCategory table
export interface ProductCategory {
  product_category_id: Generated<number>;
  category_name: string | null;
  parent_category_id: number | null;
  product_category_description: string | null;
  product_category_image_url: string | null;
}

// ProductImages table
export interface ProductImages {
  product_image_id: Generated<number>;
  image_filename: string | null;
  created_at: ColumnType<Date, string | undefined, never> | null;
}

// ProductItem table
export interface ProductItem {
  product_item_id: Generated<number>;
  product_id: number | null;
  sku: string | null;
  qty_in_stock: number | null;
  product_image_id: number | null;
  product_item_price: number | null;
  created_at: ColumnType<Date, string | undefined, never> | null;
  updated_at: ColumnType<Date, string | undefined, never> | null;
  is_active: boolean | null;
}

// ProductVariation table
export interface ProductVariation {
  product_variation_id: Generated<number>;
  category_id: number | null;
  variation_name: string | null;
}

// Role table
export interface Role {
  role_id: Generated<number>;
  role_type: string | null;
}

// UserAddress table
export interface UserAddress {
  user_id: string;
  address_id: number;
  is_default: boolean | null;
}

// Users table
export interface Users {
  user_id: string;
  user_email: string | null;
  user_phone: string | null;
  user_image_url: string | null;
  user_password: string | null;
  created_at: ColumnType<Date, string | undefined, never> | null;
  updated_at: ColumnType<Date, string | undefined, never> | null;
  role_id: number | null;
  user_name:string | null ;
}

// VariationOptions table
export interface VariationOptions {
  variation_option_id: Generated<number>;
  product_variation_id: number | null;
  value: string | null;
}

// Type-safe wrappers for database operations
export type AddressInsert = Insertable<Address>;
export type AddressSelect = Selectable<Address>;
export type AddressUpdate = Updateable<Address>;

export type ProductSelect = Selectable<Product>;
export type ProductInsert = Insertable<Product>;
export type ProductUpdate = Updateable<Product>;

export type UsersSelect = Selectable<Users>;
export type UsersInsert = Insertable<Users>;
export type UsersUpdate = Updateable<Users>;

// AuthSession table operation wrappers
export type AuthSessionSelect = Selectable<AuthSession>;
export type AuthSessionInsert = Insertable<AuthSession>;
export type AuthSessionUpdate = Updateable<AuthSession>;


// ProductCategory table operation wrappers
export type ProductCategorySelect = Selectable<ProductCategory>;
export type ProductCategoryInsert = Insertable<ProductCategory>;
export type ProductCategoryUpdate = Updateable<ProductCategory>;

// ProductImages table operation wrappers
export type ProductImagesSelect = Selectable<ProductImages>;
export type ProductImagesInsert = Insertable<ProductImages>;
export type ProductImagesUpdate = Updateable<ProductImages>;

// ProductItem table operation wrappers
export type ProductItemSelect = Selectable<ProductItem>;
export type ProductItemInsert = Insertable<ProductItem>;
export type ProductItemUpdate = Updateable<ProductItem>;

// ProductVariation table operation wrappers
export type ProductVariationSelect = Selectable<ProductVariation>;
export type ProductVariationInsert = Insertable<ProductVariation>;
export type ProductVariationUpdate = Updateable<ProductVariation>;

// Role table operation wrappers
export type RoleSelect = Selectable<Role>;
export type RoleInsert = Insertable<Role>;
export type RoleUpdate = Updateable<Role>;

// UserAddress table operation wrappers
export type UserAddressSelect = Selectable<UserAddress>;
export type UserAddressInsert = Insertable<UserAddress>;
export type UserAddressUpdate = Updateable<UserAddress>;

// VariationOptions table operation wrappers
export type VariationOptionsSelect = Selectable<VariationOptions>;
export type VariationOptionsInsert = Insertable<VariationOptions>;
export type VariationOptionsUpdate = Updateable<VariationOptions>;




export const db = new Kysely<DB>({
   dialect
  })