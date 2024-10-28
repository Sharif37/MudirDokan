// signUpRouter.ts
import express, { RouterOptions, Request, Response } from "express";
import { number, z } from "zod";
import {  registerUser } from "../services/userService";

const routerOptions: RouterOptions = {
  caseSensitive: true,
};
const signUpRouter = express.Router(routerOptions);
 
/*
 if user is customer set role_id=1 ,
 if user is Admin set role_id =2,
 if user is staff set role_id=3 
*/


const Roles = {
  CUSTOMER: 1,
  ADMIN: 2,
  STAFF: 3,
} as const


export const UserBodySchema = z.object({
  user_name:z.string().optional(),
  user_email: z.string().email(),
  user_phone: z.string().optional(),
  user_image_url: z.string().url().optional(),
  password: z.string().min(5), 
});


const userRegistration= async (req:Request,res:Response,role_id :number) =>  {
  try {
    const userData = UserBodySchema.parse(req.body);
    const user_id = await registerUser(userData,role_id);

    res.status(201).json({
      user_id: user_id,
      message: "User registered successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        name: "Invalid data type.",
        message: error.errors,
      });
    } else {
      res.status(500).json({ message: "Error registering user", error });
    }
  }

}


signUpRouter.post("/customer", async (req: Request, res: Response) => {
  userRegistration(req, res, Roles.CUSTOMER)
});


signUpRouter.post("/admin", async (req: Request, res: Response) => {
  userRegistration(req, res, Roles.ADMIN)
});

signUpRouter.post("/staff", async (req: Request, res: Response) => {
  userRegistration(req, res, Roles.STAFF)
});

export default signUpRouter;
