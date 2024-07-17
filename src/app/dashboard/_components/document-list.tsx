"use client";

import { FC, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types";
import { DocumentItem } from "./document-item";

type Props = {
  documents: Tables<"documents">[];
};

export const DocumentList: FC<Props> = ({ documents }) => {
  const [documentList, setDocumentList] =
    useState<Tables<"documents">[]>(documents);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("test")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "documents",
        },
        (payload) => {
          const newList = documentList.map((document) => {
            if (document.id === payload.old.id) {
              return payload.new as Tables<"documents">;
            }
            return document;
          });
          setDocumentList(newList);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  });

  return (
    <div className="flex flex-col gap-y-2">
      {documentList.map((document) => (
        <DocumentItem key={document.id} document={document} />
      ))}
    </div>
  );
};
