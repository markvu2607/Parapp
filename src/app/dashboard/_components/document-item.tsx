"use client";

import { FC } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { Tables } from "@/types";
import { DocumentIcon, MoreIcon, TrashIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { deleteDocument } from "@/actions/document";

type Props = {
  document: Tables<"documents">;
};

export const DocumentItem: FC<Props> = ({ document }) => {
  const handleEdit = () => {
    // TODO: implement later
  };

  const handleDelete = () => {
    deleteDocument(document.id)
      .then(() => toast("Document has been deleted."))
      .catch(() => toast("Something went wrong. Try later!"));
  };

  return (
    <div className="group/item flex items-center gap-2 p-1 rounded-sm hover:bg-accent hover:cursor-pointer">
      {document.icon ? (
        <Image src={document.icon} width={16} height={16} alt="icon" />
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="size-6 border-none bg-inherit hover:bg-gray-300"
        >
          <DocumentIcon className="size-4" />
        </Button>
      )}
      <p className="flex-1 line-clamp-1">{document.title}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-0 border-none group-hover/item:size-6 bg-inherit hover:bg-gray-300 focus-visible:ring-transparent focus-visible:ring-offset-0"
          >
            <MoreIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className="w-56" side="right" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleEdit}>
                <TrashIcon className="size-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleDelete}>
                <TrashIcon className="size-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};
