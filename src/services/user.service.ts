import { createClient } from "@/lib/supabase/server";
import { TablesInsert } from "@/types";

class UserService {
  public static async createUser(user: TablesInsert<"users">) {
    const supabase = createClient();
    const { error, data } = await supabase.from("users").insert(user);
    if (error) {
      throw error;
    }
    return data;
  }

  public static async getUserByClerkId(clerkId: string) {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkId);

    if (error) throw error;
    return data![0].id;
  }
}

export default UserService;
