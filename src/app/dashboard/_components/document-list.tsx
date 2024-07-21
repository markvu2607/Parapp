"use client";

import { useAuth } from "@clerk/nextjs";
import { FC, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types";
import { DocumentItem } from "./document-item";

type Props = {
  documents: Tables<"documents">[];
};

export const DocumentList: FC<Props> = ({ documents }) => {
  const { userId } = useAuth();
  const [documentList, setDocumentList] =
    useState<Tables<"documents">[]>(documents);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(userId!)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "documents",
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setDocumentList((prev) => [
                ...prev,
                payload.new as Tables<"documents">,
              ]);
              break;
            case "UPDATE":
              const newList = documentList.map((document) => {
                if (document.id === payload.old.id) {
                  return payload.new as Tables<"documents">;
                }
                return document;
              });
              setDocumentList(newList);
              break;
            case "DELETE":
              setDocumentList((prev) =>
                prev.filter((document) => document.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  });

  return (
    <div className="flex flex-col gap-y-1">
      {documentList.map((document) => (
        <DocumentItem key={document.id} document={document} />
      ))}
    </div>
  );
};
