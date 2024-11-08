// signUpRouter.ts
import { Request, Response } from "express";
import { z } from "zod";
import { registerUser } from "../services/userService";

/*
 if user is Admin set role_id =1,
 if user is customer set role_id=2 ,
 if user is staff set role_id=3 
*/
  

export const UserBodySchema = z.object({
  user_name: z.string().optional(),
  user_email: z.string().email(),
  user_phone: z.string().optional(),
  user_image_url: z.string().url().optional(),
  password: z.string().min(6),
});

export const userRegistration = async (
  req: Request,
  res: Response,
  role_id: number
) => {
  try {
    const userData = UserBodySchema.parse(req.body);
    const user_id = await registerUser(userData, role_id);

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
};
