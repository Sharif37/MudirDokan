import { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import * as uploadService from "../services/uploadService";
import path from 'path';
import * as uploadModel from "../models/uploadModel" ;

const MAX_IMAGES = 8;
const UPLOAD_DIR = "uploads/productImage";

// Ensure upload directory exists
const createUploadDirectory = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    createUploadDirectory(UPLOAD_DIR);
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}_${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

const validateRequest = (req: Request): number | null => {
  const productId = parseInt(req.body.product_id, 10);
  return isNaN(productId) ? null : productId;
};


export async function uploadImages(req: Request, res: Response) {
  upload.fields([
    { name: "images", maxCount: MAX_IMAGES },
    { name: "product_id", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "Error uploading images", error: err });

    const productId = validateRequest(req);
    if (!productId) return res.status(400).json({ message: "Invalid or missing product ID" });

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const imageFiles = files?.["images"];
    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    try {
      const uploadedImages = await saveUploadedFiles(imageFiles, productId);
      res.status(201).json({ message: "Images uploaded successfully", uploadedImages });
    } catch (error) {
      res.status(500).json({ message: "Error saving image info to database", error });
    }
  });
}


const saveUploadedFiles = async (imageFiles: Express.Multer.File[], productId: number) => {
    return Promise.all(
      imageFiles.map(async (file) => {
        const filename = file.filename;
        const createdImage = await uploadService.saveImage({
          image_filename: filename,
          product_id: productId,
        });
        return { image_id: createdImage.image_id, filename };
      })
    );
  };


  export async function getImageByFilename(req: Request, res: Response) {
    const { image_filename } = req.params;
  
    try {
      // Check if the image exists in the database
      const image = await uploadModel.getImageByFilename(image_filename);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      const imagePath = path.join(__dirname, '../../uploads/productImage', image_filename);
      console.log(imagePath)
      res.sendFile(imagePath);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving image', error });
    }
  }