import { db, ProductInsert, ProductUpdate } from "../database"; 


// Fetch a single product by ID
export async function getProductById(productId: number) {
  const productWithImages = await db
    .selectFrom('product')
    .leftJoin('images', 'product.product_id', 'images.product_id')
    .where('product.product_id', '=', productId)
    .select([
      'product.product_id',
      'product.product_name',
      'product.product_old_price',
      'product.product_new_price',
      'product.product_description',
      'images.image_id',
      'images.image_filename',
    ])
    .execute();

  // If no product found, return null
  if (productWithImages.length === 0) {
    return null;
  }

  // Group images under a single product object
  const product = {
    product_id: productWithImages[0].product_id,
    product_name: productWithImages[0].product_name,
    product_old_price: productWithImages[0].product_old_price,
    product_new_price: productWithImages[0].product_new_price,
    product_description: productWithImages[0].product_description,
    images: productWithImages.map((row) => ({
      image_id: row.image_id,
      image_filename: row.image_filename,
    })),
  };

  return product;
}



// Create a new product
export async function createProduct(productData:ProductInsert) {
  return db.insertInto('product')
    .values(productData)
    .returningAll()
    .executeTakeFirstOrThrow();
}

// Update an existing product
export async function updateProduct(productId: number, productData: ProductUpdate) {
  await db.updateTable('product')
    .set(productData)
    .where('product.product_id', '=', productId)
    .execute();
}

// Delete a product
export async function deleteProduct(productId: number) {
  await db.deleteFrom('product')
    .where('product.product_id', '=', productId)
    .execute();
}

// Fetch all categories
export  function getAllCategories() {
  return db.selectFrom('product_category')
    .selectAll() ;
}

// Fetch all products in a specific category
export  function getProductsByCategoryId(categoryId: number) {
  return db.selectFrom('product')
    .selectAll()
    .where('product.product_category_id', '=', categoryId) ;
   
}

