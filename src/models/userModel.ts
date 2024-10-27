import { db } from "../../src/database/index";
import { UsersInsert, RoleInsert } from '../database/index'; // Import necessary types

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

