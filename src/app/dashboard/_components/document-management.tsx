"use client";

import { FC } from "react";

import { createNewDocument } from "@/actions/document";
import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Tables } from "@/types";
import { DocumentList } from "./document-list";

type Props = {
  documents: Tables<"documents">[];
};

export const DocumentManagement: FC<Props> = ({ documents }) => {
  const handleCreateNewDocument = () => {
    createNewDocument();
  };

  return (
    <div className="px-3">
      <div className="flex items-center pb-2">
        <h2 className="flex-1 font-bold text-xl">Private</h2>
        <Button
          variant="outline"
          size="icon"
          className="border-none size-6"
          onClick={handleCreateNewDocument}
        >
          <PlusIcon className="size-4" />
        </Button>
      </div>
      <DocumentList documents={documents} />
    </div>
  );
};
