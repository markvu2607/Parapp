"use server";

import DocumentService from "@/services/document.service";
import UserService from "@/services/user.service";
import { Tables } from "@/types";
import { auth } from "@clerk/nextjs/server";

export const createNewDocument = async () => {
  const { userId } = auth();
  const id = await UserService.getUserByClerkId(userId!);
  const data = await DocumentService.createDocument({
    title: "Untitled",
    content: "",
    user_id: id,
  });
  return data;
};

export const deleteDocument = async (id: Tables<"documents">["id"]) => {
  const data = await DocumentService.deleteDocument(id);
  return data;
};

export const editDocument = async (
  id: Tables<"documents">["id"],
  document: Omit<Partial<Tables<"documents">>, "id">
) => {
  const data = await DocumentService.updateDocument(id, document);
  return data;
};
