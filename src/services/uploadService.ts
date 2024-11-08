import * as productModel from "../models/uploadModel";

export async function saveImage(imageData: { image_filename: string, product_id: number }) {
  return await productModel.createImage(imageData);
}
