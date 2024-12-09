import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Json = JsonValue;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Numeric = ColumnType<string, number | string, number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

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

export interface AuthSession {
  create_at: Timestamp | null;
  expires_at: Timestamp | null;
  is_active: boolean | null;
  session_id: string;
  user_id: string | null;
}

export interface Cart {
  cart_id: Generated<number>;
  user_id: string | null;
}

export interface CartItem {
  cart_id: number | null;
  cart_item_id: Generated<number>;
  product_item_id: number | null;
  qty: number | null;
}

export interface CustomerOrder {
  order_date: Timestamp | null;
  order_id: Generated<number>;
  order_status_id: number | null;
  order_total: Numeric | null;
  payment_method_id: number | null;
  shipping_address_id: number | null;
  user_id: string | null;
}

export interface OrderItem {
  order_id: number | null;
  order_item: Generated<number>;
  price: Numeric | null;
  product_item_id: number | null;
  qty: number | null;
}

export interface OrderStatus {
  order_status_id: Generated<number>;
  status: string | null;
}

export interface PaymentMethod {
  account_number: string | null;
  expiry_date: Timestamp | null;
  is_default: boolean | null;
  payment_id: Generated<number>;
  payment_type_id: number | null;
  provider: string | null;
  user_id: string | null;
}

export interface PaymentType {
  payment_type_id: Generated<number>;
  value: string | null;
}

export interface Product {
  main_image_id: number | null;
  product_category_id: number | null;
  product_description: Json | null;
  product_id: Generated<number>;
  product_image_ids: Json | null;
  product_name: string | null;
  product_new_price: number | null;
  product_old_price: number | null;
  product_term_and_condition: Json | null;
}

export interface ProductCategory {
  category_name: string | null;
  parent_category_id: number | null;
  product_category_description: string | null;
  product_category_id: Generated<number>;
  product_category_image_url: string | null;
}

export interface ProductImages {
  created_at: Timestamp | null;
  image_filename: string | null;
  product_image_id: Generated<number>;
}

export interface ProductItem {
  created_at: Timestamp | null;
  is_active: boolean | null;
  product_id: number | null;
  product_image_id: number | null;
  product_item_id: Generated<number>;
  product_item_price: number | null;
  qty_in_stock: number | null;
  sku: string | null;
  updated_at: Timestamp | null;
}

export interface ProductVariation {
  category_id: number | null;
  product_variation_id: Generated<number>;
  variation_name: string | null;
}

export interface Promotion {
  description: string | null;
  discount_rate: Numeric | null;
  end_date: Timestamp | null;
  name: string | null;
  promotion_id: Generated<number>;
  start_date: Timestamp | null;
}

export interface PromotionCategory {
  product_category_id: number;
  promotion_id: number;
}

export interface Role {
  role_id: Generated<number>;
  role_type: string | null;
}

export interface UserAddress {
  address_id: number;
  is_default: boolean | null;
  user_id: string;
}

export interface UserReview {
  comment: string | null;
  order_product_id: number | null;
  rating_value: number | null;
  user_id: string | null;
  user_review_id: Generated<number>;
}

export interface Users {
  created_at: Timestamp | null;
  role_id: number | null;
  updated_at: Timestamp | null;
  user_email: string | null;
  user_id: string;
  user_image_url: string | null;
  user_name: string | null;
  user_password: string | null;
  user_phone: string | null;
}

export interface VariationOptions {
  product_variation_id: number | null;
  value: string | null;
  variation_option_id: Generated<number>;
}

export interface WishList {
  product_id: number | null;
  user_id: string | null;
  wishlist_id: Generated<number>;
}

export interface DB {
  address: Address;
  auth_session: AuthSession;
  cart: Cart;
  cart_item: CartItem;
  customer_order: CustomerOrder;
  order_item: OrderItem;
  order_status: OrderStatus;
  payment_method: PaymentMethod;
  payment_type: PaymentType;
  product: Product;
  product_category: ProductCategory;
  product_images: ProductImages;
  product_item: ProductItem;
  product_variation: ProductVariation;
  promotion: Promotion;
  promotion_category: PromotionCategory;
  role: Role;
  user_address: UserAddress;
  user_review: UserReview;
  users: Users;
  variation_options: VariationOptions;
  wish_list: WishList;
}
