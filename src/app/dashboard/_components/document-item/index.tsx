"use client";

import { EmojiClickData } from "emoji-picker-react";
import { FC, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";

import { deleteDocument, editDocument } from "@/actions/document";
import { Input } from "@/components/ui/input";
import { Tables } from "@/types";
import { DocumentIcon } from "./document-icon";
import { DocumentMenu } from "./document-menu";

type Props = {
  document: Tables<"documents">;
};

export const DocumentItem: FC<Props> = ({ document }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);

  const handleChangeTitle = useDebounceCallback<(title: string) => void>(
    // TODO: implement useOptimistic to optimize ui when update title.
    (title: string) => {
      editDocument(document.id, { title });
    },
    300
  );

  const handleChangeIcon = (emojiData: EmojiClickData) => {
    editDocument(document.id, { icon: emojiData.emoji });
  };

  const handleClickRename = () => {
    // wait DropdownMenu unmount with 200ms
    setTimeout(() => {
      setIsRenaming(true);
    }, 200);
  };

  const handleDelete = () => {
    deleteDocument(document.id)
      .then(() => toast("Document has been deleted."))
      .catch(() => toast("Something went wrong. Try later!"));
  };

  useEffect(() => {
    if (isRenaming) {
      inputRef.current?.focus();
    }
  }, [isRenaming]);

  return (
    <div className="group/item flex items-center gap-2 p-1 rounded-sm hover:bg-accent hover:cursor-pointer">
      <DocumentIcon document={document} onChangeIcon={handleChangeIcon} />
      <div className="flex-1">
        {isRenaming ? (
          <Input
            ref={inputRef}
            className="h-8 outline-none"
            type="text"
            placeholder="Untitled"
            defaultValue={document.title || ""}
            onChange={(event) => handleChangeTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                setIsRenaming(false);
              }
            }}
            onBlur={() => setIsRenaming(false)}
          />
        ) : (
          <p className="line-clamp-1">{document.title}</p>
        )}
      </div>
      <DocumentMenu
        onRename={handleClickRename}
        onConfirmDelete={handleDelete}
      />
    </div>
  );
};
