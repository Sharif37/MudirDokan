import { Request, Response, RequestHandler } from "express";
import { z } from "zod";
import { authenticateUser } from "../services/loginService";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const loginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const { role, token } = await authenticateUser(email, password);

    res.status(200).json({
      message: "Successfully logged in",
      role: role,
      token: token,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        name: "Invalid data type.",
        message: error.errors,
      });
    } else if (error.message === "User not found") {
      res.status(404).json({ message: "User not found. Please sign up first." });
    } else if (error.message === "Password does not match") {
      res.status(403).json({ message: "Password does not match. Try again." });
    } else if (error.message === "Role not found for the user") {
      res.status(404).json({ message: "Role not found for the user" });
    } else {
      res.status(500).json({ message: "Error logging in user", error });
    }
  }
};



