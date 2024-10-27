// userService.ts
import bcrypt from "bcrypt";
import { createUser} from "../models/userModel";
import generateToken from "../routes/auth/generateRandomNumber";
import { Role } from "../routes/auth/roles";
import { UsersInsert } from "../database/index"; // Import the UsersInsert type

const saltRounds = 10;

export const registerCustomer = async (data: any): Promise<string> => {
  const user_id = generateToken(12);
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  const userData: UsersInsert = {
    user_id: user_id,
    user_email: data.user_email,
    user_phone: data.user_phone || null,
    user_image_url: data.user_image_url || null,
    user_password: hashedPassword,
    created_at: new Date().toISOString(), 
    updated_at: new Date().toISOString(), 
    role_id: data.role_id || null, 
  };
 
  await createUser(userData);

  return user_id;
};
