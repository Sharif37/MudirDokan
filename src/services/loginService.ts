import bcrypt from "bcrypt";
import { getUserByEmail, getUserRoleById } from "../models/userModel";
import { generateJWT } from "../routes/auth/auth";
import { Roles } from "../routes/auth/roles";

export const authenticateUser = async (email: string, password: string) => {
  // Fetch user from the database
  const user = await getUserByEmail(email);
  if (!user) throw new Error("User not found");

  // Compare provided password with  hashed
  const passwordMatch = await bcrypt.compare(password, user.user_password!);
  if (!passwordMatch) throw new Error("Password does not match");

  // Fetch the user's role
  const roleRecord = await getUserRoleById(user.user_id);
  if (!roleRecord) throw new Error("Role not found for the user");

  const role = roleRecord.role_type as Roles;

  // Generate JWT token
  const token = generateJWT(user.user_id, role);

  return { role, token };
};
