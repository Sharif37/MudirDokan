import express from "express";
import * as uploadController from "../controllers/uploadController";
import { requireRole, verifySession } from "./auth/auth";
import { Roles } from "./auth/roles";

const uploadRouter = express.Router();

// Define route for image upload
uploadRouter.post(
  "/image",
  verifySession,
  requireRole([Roles.Admin]),
  uploadController.uploadImages
);
uploadRouter.get(
  "/:image_filename",
  verifySession,
  requireRole([Roles.Admin]),
  uploadController.getImageByFilename
);

export default uploadRouter;
