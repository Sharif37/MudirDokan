import { db } from "../../src/database/index";
import { UsersInsert, RoleInsert } from '../database/index'; 

// Function to create a new user
export const createUser = async (userData: UsersInsert) => {
  try {
    const user = await db
      .insertInto("users")
      .values(userData)
      .executeTakeFirstOrThrow(); 

    return user; 
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error; 
  }
};


export const getUserByEmail = async (email: string) => {
  return await db
    .selectFrom("users")
    .selectAll()
    .where("users.user_email", "=", email)
    .executeTakeFirst();
};

export const getUserRoleById = async (userId: string) => {
  return await db
    .selectFrom("role")
    .select("role.role_type")
    .innerJoin("users","users.role_id","role.role_id")
    .where("users.user_id", "=", userId)
    .executeTakeFirst();
};

