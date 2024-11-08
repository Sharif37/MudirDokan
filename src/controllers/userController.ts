import { Response } from "express";
import { db } from "../database";
import { SessionRequest } from "../routes/auth/auth";

export const getCurrentUserData = async (req: SessionRequest, res: Response) => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in request" });
    }

    const user = await db
      .selectFrom("users")
      .selectAll()
      .innerJoin("role",  "users.role_id","role.role_id")
      .where("users.user_id", "=", userId)
      .executeTakeFirst();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.user_password = "";
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user data", error });
  }
};
