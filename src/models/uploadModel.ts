import { db } from "../database";

export async function createImage(imageData: { image_filename: string,product_id: number }) {
  return db.insertInto('images')
    .values({ 
        product_id: imageData.product_id ,
        image_filename: imageData.image_filename

     })
    .returning("image_id")
    .executeTakeFirstOrThrow();
}

export async function getImageByFilename(imageFilename: string) {
    return db
      .selectFrom('images')
      .select(['image_id', 'image_filename'])
      .where('image_filename', '=', imageFilename)
      .executeTakeFirst();
  }
