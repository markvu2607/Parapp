import { InsertUser, usersTable } from "@/db/schema";
import { db } from "@/db";

class UserService {
  public static async createUser(user: InsertUser) {
    return await db.insert(usersTable).values(user);
  }
}

export default UserService;
