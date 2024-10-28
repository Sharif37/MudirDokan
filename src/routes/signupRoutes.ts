// /logInRouter.ts
import express, { RouterOptions, Request, Response } from "express";
import { userRegistration } from "../controllers/signUpController";
import { Role } from "./auth/roles";
Role


const routerOptions: RouterOptions = {
  caseSensitive: true,
};
const signUpRouter = express.Router(routerOptions);

signUpRouter.post("/customer", async (req: Request, res: Response) => {
    userRegistration(req, res, Role.Customer)
  });
  
  
  signUpRouter.post("/admin", async (req: Request, res: Response) => {
    userRegistration(req, res, Role.Admin)
  });
  
  signUpRouter.post("/staff", async (req: Request, res: Response) => {
    userRegistration(req, res, Role.Staff)
  });

export default signUpRouter;
