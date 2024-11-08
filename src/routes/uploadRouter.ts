import express from "express";
import * as uploadController from "../controllers/uploadController";

const uploadRouter = express.Router();

// Define route for image upload
uploadRouter.post("/image", uploadController.uploadImages);
uploadRouter.get("/:image_filename",uploadController.getImageByFilename);

export default uploadRouter;
