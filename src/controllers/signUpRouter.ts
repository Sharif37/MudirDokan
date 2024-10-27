// signUpRouter.ts
import express, { RouterOptions, Request, Response } from "express";
import { z } from "zod";
import { registerCustomer } from "../services/userService";

const routerOptions: RouterOptions = {
  caseSensitive: true,
};
const signUpRouter = express.Router(routerOptions);

// Schema definition for user data, aligned with Users interface
export const UserBodySchema = z.object({
  user_email: z.string().email(),
  user_phone: z.string().optional(),
  user_image_url: z.string().url().optional(),
  password: z.string().min(5),
  role_id: z.number().optional(), 
});

// POST route to register a new customer
signUpRouter.post("/customer", async (req: Request, res: Response) => {
  try {
    const userData = UserBodySchema.parse(req.body);
    const user_id = await registerCustomer(userData);

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
});

export default signUpRouter;
