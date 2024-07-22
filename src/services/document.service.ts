import { createClient } from "@/lib/supabase/server";
import { Tables, TablesInsert } from "@/types";

class DocumentService {
  public static async createDocument(document: TablesInsert<"documents">) {
    const supabase = createClient();
    const { error, data } = await supabase.from("documents").insert(document);
    if (error) {
      throw error;
    }
    return data;
  }

  public static async deleteDocument(id: Tables<"documents">["id"]) {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("documents")
      .delete()
      .match({ id });
    if (error) {
      throw error;
    }
    return data;
  }

  public static async updateDocument(
    id: Tables<"documents">["id"],
    document: Partial<Tables<"documents">>
  ) {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("documents")
      .update(document)
      .eq("id", id);
    if (error) {
      throw error;
    }
    return data;
  }
}

export default DocumentService;
