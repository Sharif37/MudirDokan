import express from "express";
import { getCurrentUserData } from "../controllers/userController";
import { requireRole, verifySession } from "../routes/auth/auth";
import { Roles } from "./auth/roles";

const router = express.Router();


router.get("/me", verifySession,requireRole([Roles.Customer]), getCurrentUserData);

export default router;
